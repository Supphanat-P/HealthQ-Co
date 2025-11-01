import React, { useContext, useMemo, useState, useEffect } from "react";
import DataContext from "../../Context/DataContext";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const TableToolbar = ({ query, setQuery, pageSize, setPageSize }) => (
  <div className="d-flex gap-2 align-items-center mb-3">
    <input
      className="form-control w-50"
      placeholder="ค้นหาด้วยคำสำคัญ..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      aria-label="ค้นหา"
    />
    <select
      className="form-select w-auto"
      value={pageSize}
      onChange={(e) => setPageSize(Number(e.target.value))}
      aria-label="ขนาดหน้า"
    >
      {PAGE_SIZE_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s} / หน้า
        </option>
      ))}
    </select>
  </div>
);

const PaginatedTable = ({ columns, rows, pageSize, setPageSize }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));

  // reset to first page when rows or pageSize change
  useEffect(() => {
    setPage(1);
  }, [rows, pageSize]);

  // clamp page if it falls out of range
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page, pageSize]);

  return (
    <>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover mb-0">
          <thead className="table-light">
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r, idx) => (
              <tr key={r.key || idx}>
                {columns.map((c) => (
                  <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-muted py-4"
                >
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-2">
        <div>
          <small>
            หน้า {page} / {totalPages} — {rows.length} รายการ
          </small>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            ก่อนหน้า
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </>
  );
};

const ShowData = () => {
  const { specialties, doctors, hospitals, doctorsSchedule } =
    useContext(DataContext);

  const [active, setActive] = useState("doctors");

  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const q = query.trim().toLowerCase();

  const specialtiesRows = useMemo(() => {
    const base = specialties || [];
    return base
      .filter((s) =>
        q
          ? (s.specialty_name || "").toLowerCase().includes(q) ||
            (s.specialty_id || "").toLowerCase().includes(q)
          : true
      )
      .map((s) => ({ key: s.specialty_id, ...s }));
  }, [specialties, q]);

  const hospitalsRows = useMemo(() => {
    const base = hospitals || [];
    return base
      .filter((h) =>
        q
          ? (h.hospital_name || "").toLowerCase().includes(q) ||
            (h.hospital_id || "").toLowerCase().includes(q)
          : true
      )
      .map((h) => ({ key: h.hospital_id, ...h }));
  }, [hospitals, q]);

  const doctorsRows = useMemo(() => {
    const base = doctors || [];
    return base
      .filter((d) => {
        if (!q) return true;
        return [d.doctor_name, d.doctor_id, d.specialty_name, d.hospital_name]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q));
      })
      .map((d) => ({ key: d.doctor_id, ...d }));
  }, [doctors, q]);

  const schedulesRows = useMemo(() => {
    const base = doctorsSchedule || [];
    return base
      .map((s) => {
        const doctor = (doctors || []).find((d) => d.doctor_id === s.doctor_id);
        const raw = Array.isArray(s.schedule)
          ? s.schedule
          : Array.isArray(s.slots)
          ? s.slots
          : [];

        const scheduleArray = raw.map((it) => {
          const obj = it || {};
          const day = obj.day || null;
          const date = obj.date || obj.schedule_date || null;

          // derive times array from common possible fields
          let times = [];
          if (Array.isArray(obj.times) && obj.times.length) {
            times = obj.times.slice();
          } else if (obj.times) {
            times = [String(obj.times)];
          } else if (obj.start_time && obj.end_time) {
            times = [`${obj.start_time}-${obj.end_time}`];
          } else if (obj.time) {
            times = [String(obj.time)];
          } else if (obj.schedule_text) {
            const parts = String(obj.schedule_text).trim().split(/\s+/);
            if (parts.length >= 2 && times.length === 0)
              times = [parts.slice(1).join(" ")];
          }

          return {
            day,
            date,
            times: times.length ? times : ["-"],
            start_time: obj.start_time || null,
            end_time: obj.end_time || null,
            duration: obj.duration || null,
            status: obj.status || null,
            schedule_text: obj.schedule_text || null,
            raw: obj,
          };
        });

        const text = scheduleArray
          .map(
            (it) =>
              `${it.day || "-"} (${it.date || "-"}): ${it.times.join(", ")}`
          )
          .join("; ");

        return {
          key: s.doctor_id,
          doctor_id: s.doctor_id,
          doctor_name: doctor ? doctor.doctor_name : "-",
          schedule_text: text,
          schedule: scheduleArray,
        };
      })
      .filter((r) =>
        q
          ? `${r.doctor_name} ${r.schedule_text}`.toLowerCase().includes(q)
          : true
      );

    console.log("Filtered schedules:", filtered);
  }, [doctorsSchedule, doctors, q]);

  const renderTab = () => {
    if (active === "specialties") {
      return (
        <>
          <TableToolbar
            query={query}
            setQuery={setQuery}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
          <PaginatedTable
            columns={[
              { key: "specialty_id", header: "รหัส (specialty_id)" },
              { key: "specialty_name", header: "ความชำนาญ (specialty_name)" },
            ]}
            rows={specialtiesRows}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </>
      );
    }

    if (active === "hospitals") {
      return (
        <>
          <TableToolbar
            query={query}
            setQuery={setQuery}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
          <PaginatedTable
            columns={[
              { key: "hospital_id", header: "รหัส (hospital_id)" },
              { key: "hospital_name", header: "ชื่อโรงพยาบาล (hospital_name)" },
            ]}
            rows={hospitalsRows}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </>
      );
    }

    if (active === "schedules") {
      return (
        <>
          <TableToolbar
            query={query}
            setQuery={setQuery}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
          <PaginatedTable
            columns={[
              { key: "doctor_id", header: "รหัสแพทย์ (doctor_id)" },
              { key: "doctor_name", header: "ชื่อแพทย์ (doctor_name)" },
              {
                key: "schedule_text",
                header: "ตารางนัด (schedule_text)",
                render: (r) =>
                  r.schedule && r.schedule.length ? (
                    <div>
                      {r.schedule.map((it, i) => (
                        <div key={i} className="mb-1">
                          <div>
                            <strong>
                              {it.day || "-"} ({it.date || "-"})
                            </strong>
                            :{" "}
                            {Array.isArray(it.times)
                              ? it.times.join(", ")
                              : it.times || "-"}
                            {it.duration ? (
                              <span className="ms-2">— {it.duration} นาที</span>
                            ) : null}
                            {it.status ? (
                              <span
                                className={`badge ms-2 ${
                                  it.status === "booked"
                                    ? "bg-danger"
                                    : "bg-success"
                                }`}
                              >
                                {it.status}
                              </span>
                            ) : null}
                          </div>
                          {it.schedule_text ? (
                            <div className="small text-muted">
                              {it.schedule_text}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : (
                    "-"
                  ),
              },
            ]}
            rows={schedulesRows}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </>
      );
    }

    // default: doctors
    return (
      <>
        <TableToolbar
          query={query}
          setQuery={setQuery}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
        <PaginatedTable
          columns={[
            { key: "doctor_id", header: "รหัส (doctor_id)" },
            { key: "doctor_name", header: "ชื่อแพทย์ (doctor_name)" },
            { key: "specialty_name", header: "ความชำนาญ (specialty_name)" },
            { key: "hospital_name", header: "โรงพยาบาล (hospital_name)" },
          ]}
          rows={doctorsRows}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">ข้อมูลทั้งหมด (แอดมิน)</h2>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${active === "doctors" ? "active" : ""}`}
            onClick={() => setActive("doctors")}
          >
            แพทย์ ({doctorsRows.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${active === "specialties" ? "active" : ""}`}
            onClick={() => setActive("specialties")}
          >
            ความชำนาญ ({specialtiesRows.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${active === "hospitals" ? "active" : ""}`}
            onClick={() => setActive("hospitals")}
          >
            โรงพยาบาล ({hospitalsRows.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${active === "schedules" ? "active" : ""}`}
            onClick={() => setActive("schedules")}
          >
            ตารางแพทย์ ({schedulesRows.length})
          </button>
        </li>
      </ul>

      <div className="card rounded  p-3">{renderTab()}</div>
    </div>
  );
};

export default ShowData;
