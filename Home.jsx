import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setSurveys } from './services/surveys';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';


function Home() {
   axios.defaults.withCredentials = true;
   useEffect(() => {
      axios.get('http://localhost:3001/home')
         .then(result => {
            console.log(result)
            if (result.data === "Başarılı") {
               // Burada gerektiğinde sayfayı yönlendirebilirsiniz
            }
         })
         .catch(err => console.log(err))
   }, [])

   const [title, setTitle] = useState('');
   const [answers, setAnswers] = useState(['a', 'b']);
   const navigate = useNavigate();

   const currentAnswer = (key, val) => {
      const newAnswers = [...answers];
      newAnswers[key] = val;
      setAnswers([...newAnswers]);
   };

   const newAnswer = (key) => {
      const pre = answers.slice(0, key);
      const next = answers.slice(key, answers.length);
      setAnswers([...pre, '', ...next]);
   };

   const deleteAnswer = (key) => {
      if (answers.length > 1) {
         const newAnswers = [...answers];
         newAnswers.splice(key, 1);
         setAnswers(newAnswers);
      }
   };

   const handler = () => {
      setSurveys({ title, answers })
         .then(({ data }) => {
            navigate(`../surveys/${data._id}`);
         })
         .catch((err) => console.error(err));
   };

   return (
      <div className='container'>
         <h1 className="my-3 pb-2 border-b border-current text-4xl">
            Yeni Anket Oluştur
         </h1>
          <button className='justify-items-end'>
            Çıkış Yap
          </button>
         <ul className='p-4 bg-white rounded-lg shadow-lg '>
            <li className='mb-3'>
               <p>Soru</p>
               <input
                  className='w-52 bg-gray-300'
                  type='text'
                  value={title}
                  onChange={(e) => { setTitle(e.target.value) }}
               />
            </li>

            {answers.map((answer, key) => {
               return (
                  <li key={key} className="w-72 mb-3">
                     <p>Cevap</p>
                     <input
                        className="w-52 bg-gray-300"
                        type="text"
                        placeholder="Cevap"
                        value={answer}
                        onChange={(e) => currentAnswer(key, e.target.value)}
                     />
                     <button
                        className="mx-2 text-xl text-primary bx bx-plus"
                        onClick={() => newAnswer(key)}>
                        <FontAwesomeIcon icon={faPlus} />
                     </button>
                     <button
                        className="text-xl text-red-700 bx bx-x"
                        onClick={() => deleteAnswer(key)}>
                        <FontAwesomeIcon icon={faTimes} />
                     </button>
                  </li>
               );
            })}
            
               <button
                  className="ml-auto py-2 px-3 bg-primary text-white"
                  onClick={() => handler()}>
                  Gönder
               </button>
            
         </ul>
      </div>
   );
}

export default Home;
