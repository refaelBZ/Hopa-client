import { useEffect, useState } from 'react';
import { socket } from './socket';
import MessegesList from "./MessegesList";

export default function App() {
  // מצב לקביעת הצגה של ה-Popup
  const [showPopup, setShowPopup] = useState(false);
  // מצב לשמירת התוכן שהמשתמש מזין
  const [userInput, setUserInput] = useState('');
  // מצב עבור ההודעה מהסרבר
  const [arg, setArg] = useState('');

  useEffect(() => {
    // בדיקה האם פרטים כבר שמורים ב-localStorage
    const isDataSaved = localStorage.getItem('userInputData');
    if (!isDataSaved) {
      // הצגת ה-Popup אם אין נתונים שמורים
      setShowPopup(true);
    }

    socket.on("idToUser", (arg) => {
      console.log(arg);
      // הנחה: נרצה לשמור את ה-ID ב-localStorage (או לנהוג בו בצורה מסוימת)
      // localStorage.setItem('userId', arg); // דוגמה לשמירה
    });

    socket.on("serverMessage", (arg) => {
      console.log(arg);
      setArg(arg);
    });

    // ניקוי בעת סגירת הקומפוננטה
    return () => {
      socket.off("serverMessage");
      socket.off("idToUser");
    };
  }, []);

  const handleSave = () => {
    // שמירת התוכן ל-localStorage וסגירת ה-Popup
    localStorage.setItem('userInputData', userInput);
    setShowPopup(false);
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="app">
      {showPopup && (
        <div className="popup">
          <input type="text" value={userInput} onChange={handleChange} />
          <button onClick={handleSave}>שמור וסגור</button>
        </div>
      )}

      <MessegesList/>
    </div>
  );
}
