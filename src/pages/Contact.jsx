import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner.jsx";
import { toast } from "react-toastify";

function Contact() {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    const getOwner = async () => {
      console.log(params.ownerId);
      const docRef = doc(db, "users", params.ownerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
        setOwner(docSnap.data());
      } else {
        toast.error("Could not get owner data");
      }
    };
    getOwner();
  }, [params.ownerId]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Owner</p>
      </header>
      {owner !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">{owner?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                onChange={onChange}
                value={message}
              ></textarea>
            </div>
            <a
              href={`mailto:${owner.email}?subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
