import React from "react";
import AppRouter from './components/AppRouter';


// import { db } from './fbConfig';
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   doc,
//   deleteDoc,
//   onSnapshot,
//   serverTimestamp,
//   query,
//   orderBy,
// } from 'firebase/firestore';


// function App() {

//   // * USE STATES  
//   const [users, setUsers] = useState([]);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     age: ""
//   })


//   // * COLLECTION REFERENCE STORED IN DB
//   const userCollectionRef = collection(db, 'users');


//   // * CREATE USER
//   async function createUser() {
//       const newUser = {
//         name: userInfo.name,
//         age: userInfo.age,
//         createdAt: serverTimestamp(),
//       };

//       // Add to firebase
//       const docRef = await addDoc(userCollectionRef, newUser);
//       console.log(docRef.id);
//       // Or just use .then and return promise

//       // Reset input values
//       setUserInfo({
//         name: "",
//         age: "",
//       });
//     }  


//   // * UPDATE USER
//   function updateUser( id, age ) {
//     // specific document reference in collection 'users' distinguished using 'id'.
//     const userDoc = doc(db, 'users', id);

//     const newFields = {
//       age: Number(age) + 1,
//       lastModified: serverTimestamp(),
//     }

//     // update a specific document.
//     updateDoc(userDoc, newFields);

//   }


//   // * DELETE USER
//   function deleteUser(id) {
//     const userDoc = doc(db, 'users', id);
//     deleteDoc(userDoc);
//   }

//   // * EXECUTES ON EVERY RE-RENDER (GET USERS)
//       useEffect(() => {

//       const q = query(userCollectionRef, orderBy("createdAt", "desc"));

//       // const unsubscribe = onSnapshot(userCollectionRef, ... this is used for whole collection with no query involved.
//       const unsubscribe = onSnapshot(q, (snapshot => {
//         //? We are spreading doc.data() in order to add an id attribute to the user object.
//         setUsers(snapshot.docs.map( doc => ({...doc.data(), id: doc.id}) )) 
//       }));

//       return unsubscribe;
//     }, []);


//   // * HANDLES THE CLIENT'S INPUTS: NAME AND AGE
//   function handleInput(e) {
//     const {name, value} = e.target;
//     setUserInfo( prevValue => {
//       switch (name) {
//         case "userName":
//           return {
//             ...prevValue,
//             name: value
//           };
//         case "userAge":
//           return {
//             ...prevValue,
//             age: value
//           };
      
//         default:
//           console.log("Error.");
//       }
//     });
//   }



//   // ************APP************* //
//   return (
//     <div className="App">
//       <input autoComplete="off" name="userName" type="text" placeholder="Enter Name" value={userInfo.name} onChange={handleInput} /> 
//       <input autoComplete="off" name="userAge" type="number" placeholder="Enter Age" value={userInfo.age} onChange={handleInput} /> 
//       <button onClick={createUser}> Create User </button>
//       <ul>
//       {users.map(user =>
//           <li>
//             <h1> {user.name} </h1>
//             <h2> {user.age} </h2>
//             <button onClick={() => updateUser(user.id, user.age)}> Increase Age </button>
//             <button onClick={() => deleteUser(user.id)}> Delete User </button>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// } 

// export default App;



function App () {

 

return (
  
    <AppRouter/>
  
  );
}

export default App;


