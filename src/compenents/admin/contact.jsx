import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  // 📥 Charger les messages depuis le backend
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/contact");
      setContacts(res.data);
    } catch (error) {
      console.error("Erreur chargement contacts", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 📧 Fonction pour répondre à un message
  const handleReply = async (email) => {
    const { value: text } = await Swal.fire({
      title: "اكتب ردّك على الرسالة",
      input: "textarea",
      inputLabel: "محتوى الرد",
      inputPlaceholder: "اكتب نص الرسالة هنا...",
      showCancelButton: true,
      confirmButtonText: "إرسال",
      cancelButtonText: "إلغاء",
    });

    if (text) {
      try {
        await axios.post("http://localhost:3000/contact/reply", {
          email: email,
          subject: "Réponse de l'administration",
          message: text,
        });

        Swal.fire("✅ تم الإرسال", "تم إرسال الرد بنجاح!", "success");
      } catch (err) {
        Swal.fire("❌ خطأ", "فشل إرسال البريد الإلكتروني", "error");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
        📩 رسائل التواصل
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-xl">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">الاسم</th>
              <th className="p-3">البريد الإلكتروني</th>
              <th className="p-3">الهاتف</th>
              <th className="p-3">الموضوع</th>
              <th className="p-3">الرسالة</th>
              <th className="p-3">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr
                key={c._id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.object}</td>
                <td className="p-3">{c.description}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleReply(c.email)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                  >
                    ✉️ ردّ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
