import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Loading from "../../components/student/Loading";
import { toast } from "react-toastify";

const Certificate = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/course/get-certificate/${id}`
        );

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const data = await res.json();
        setCertificate(data.certificate);
        setStudentName(data.studentName);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  const downloadPDF = async () => {
    const input = document.getElementById("certificate");
    toast.info("Preparing download... This may take a moment.");

    try {
      const isMobile = window.innerWidth < 768;
      
      const canvas = await html2canvas(input, {
        useCORS: true,
        scale: isMobile ? 1.1 : 2, // Low scale for mobile to prevent crash
        windowWidth: 1200, // Force desktop width
        windowHeight: 900,
        x: 0,
        y: 0,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      const pdf = new jsPDF("landscape", "pt", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const width = pdfWidth;
      const height = (imgProps.height * width) / imgProps.width;
      const y = (pdfHeight - height) / 2;

      pdf.addImage(imgData, "JPEG", 0, y, width, height);

      // BLOB METHOD: Works best for Mobile Browsers
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${studentName.replace(/\s+/g, "_")}_Skillify.pdf`;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      toast.success("Download started!");
    } catch (err) {
      console.error("Download Error:", err);
      alert("Error: " + err.message);
    }
  };

  if (loading) return <div className="p-10 text-center"><Loading /></div>;
  if (notFound || !certificate) return <div className="text-center p-10">Certificate Not Found</div>;

  return (
    <div className="p-4 md:p-10 bg-purple-50 min-h-screen flex flex-col items-center">
      <div className="overflow-x-auto w-full flex justify-center mb-10">
        <div
          id="certificate"
          style={{
            width: "1123px",
            minWidth: "1123px",
            height: "794px",
            padding: "70px",
            backgroundColor: "#ffffff",
            border: "6px solid #6D28D9",
            position: "relative",
            boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
            fontFamily: "'Georgia', serif",
          }}
        >
          {/* Watermark */}
          <img
            src="/Logo.png"
            alt="Stamp"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "420px",
              opacity: 0.06,
              zIndex: 0,
            }}
          />

          <div style={{ textAlign: "center", zIndex: 2, position: "relative" }}>
            <img src="/Logo.png" alt="Logo" style={{ height: "90px", marginBottom: "10px" }} />
            <h2 style={{ letterSpacing: "4px", color: "#6D28D9" }}>SKILLIFY</h2>
          </div>

          <div style={{ textAlign: "center", marginTop: "40px", zIndex: 2, position: "relative" }}>
            <h1 style={{ fontSize: "54px", fontWeight: "bold", color: "#4C1D95" }}>
              CERTIFICATE OF COMPLETION
            </h1>
            <div style={{ width: "200px", height: "4px", background: "#6D28D9", margin: "20px auto" }} />
          </div>

          <div style={{ textAlign: "center", marginTop: "40px", zIndex: 2, position: "relative" }}>
            <p style={{ fontSize: "20px", color: "#374151" }}>This certificate is proudly awarded to</p>
            <h2 style={{
                fontSize: "48px",
                margin: "30px 0",
                fontWeight: "bold",
                color: "#111827",
                borderBottom: "3px solid #6D28D9",
                display: "inline-block",
                paddingBottom: "10px",
              }}>
              {studentName}
            </h2>
            <p style={{ fontSize: "20px", marginTop: "30px" }}>for successfully completing the course</p>
            
            {/* CORRECTED COURSE NAME DISPLAY */}
            <p style={{ fontSize: "30px", fontWeight: "bold", color: "#5B21B6", marginTop: "10px" }}>
              {certificate.courseName || certificate.couseName || "Course Name Unavailable"}
            </p>
          </div>

          <div style={{
              position: "absolute",
              bottom: "60px",
              left: "70px",
              right: "70px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              zIndex: 2,
            }}>
            <div style={{ fontSize: "14px", color: "#374151" }}>
              Certificate ID: <strong>{certificate.certificateId}</strong><br />
              Verify at: skillify/certificates/{certificate.certificateId}
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{
                  fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                  fontSize: "36px",
                  color: "#111827",
                  marginBottom: "-6px",
                }}>
                Aneeza
              </div>
              <div style={{ width: "220px", borderBottom: "2px solid #374151", margin: "6px auto" }} />
              <p style={{ fontSize: "14px" }}>ANEEZA<br />CEO, Skillify</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="fixed bottom-8 right-8 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-bold shadow-xl transition-all active:scale-95 z-50"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Certificate;