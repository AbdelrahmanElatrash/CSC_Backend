const handleRegistration = async (req, res) => {
    try {
      const { username, email, password, confirmPassword, role } = req.body;
      
     
      console.log('Received data:', req.body);
  
  
      
      if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
      }
  
      
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
      const is_active = false;
  
      // Store the user data in the PostgreSQL database
      const query = {
        text: 'INSERT INTO user_credentials (username, email, password, is_active, role) VALUES ($1, $2, $3, $4, $5)',
        values: [username, email, hashedPassword, is_active, role],
      };
      
  
      try {
        await db.query(query);
       
        res.json({ message: 'Registration successful' });
      } catch (error) {
        
        if (error.code === '23514' && error.constraint === 'min_length_username') {
          return res.status(400).json({ error: 'The username should be at least 8 characters.' });
        }
        if (error.constraint === 'user_credentials_username_key' || error.constraint === 'user_credentials_email_key') {
          return res.status(400).json({ error: 'This user is already exist.' });
        } else {
          console.error(error);
          res.json({ error: 'An error occurred during registration.' });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during registration.' });
    }
  };
  
const handleAddSubject = async (req, res) => {
    try {
      const { subject_name, new_pass_mark } = req.body;
  
      // Check if required fields are provided
      if (!subject_name || !new_pass_mark) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Store the subject data in the PostgreSQL database
      const query = {
        text: 'INSERT INTO subjects (subject_name, new_pass_mark) VALUES ($1, $2)',
        values: [subject_name, new_pass_mark],
      };
  
      try {
        // Execute the database query
        await db.query(query);
  
        // If the query is successful, send a success response
        res.status(201).json({ message: 'Subject added successfully' });
      } catch (error) {
        // If an error occurs, log the error for debugging purposes
        console.error('Error adding subject:', error);
  
        // Send an error response with a status code of 500 (Internal Server Error)
        res.status(500).json({ error: 'An error occurred while adding the subject' });
      }
    } catch (error) {
      console.error('Error during subject addition:', error);
      res.status(500).json({ error: 'An error occurred during subject addition' });
    }
  };
  
const handleGetData = async (req, res) => {
    
      
      const sql = 'SELECT * FROM user_credentials';
      db.query(sql)
      .then((data)=>{
          res.send(data.rows);
      })
      .catch((err)=>{
        console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving data.' });
    })
  }
  
  
const handleGetassign = async (req, res) => {
    
      
    const sql = 'SELECT * FROM student_subjects';
    db.query(sql)
    .then((data)=>{
        res.send.json(data.rows);
    })
    .catch((err)=>{
      console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'An error occurred while retrieving data.' });
  })
  }


const logIn=async  (req, res) => {
    const { email, password } = req.body;

  console.log('Login attempt with email:', email);
  // Check user's credentials against the database
  const query = {
    text: 'SELECT * FROM user_credentials WHERE email = $1',
    values: [email],
  };

  try {
    const result = await db.query(query);
    console.log('Query result:', result.rows);


    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'user_not_found', message: 'User not found' });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({ error: 'account_inactive', message: 'Account is inactive' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, consider it a successful login
      return res.status(200).json({ username: user.username, is_active: user.is_active });
    } else {
      return res.status(401).json({ error: 'incorrect_password', message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'server_error', message: 'An error occurred during login' });
  }
  }


const addsubject=async (req,res)=>{

    const { subject_name, pass_mark ,student_mark,is_active,user_id} = req.body;
  

const query = {
  text: 'INSERT INTO student (subject_name, pass_mark, student_mark, is_active, user_id) VALUES ($1, $2, $3, $4, $5)',
    values: [subject_name,pass_mark,student_mark,is_active,user_id],
};


try {
  const result = await db.query(query);
  console.log('Query result:', result.rows);
  res.send(200);
    
}
catch (error) {
  console.error('Error during adding subject:', error);
  res.status(500).send('An error occurred during login');
}

  }


const getSubject=(req, res) => {
    const sql = 'SELECT subject_name, new_pass_mark FROM subjects';
      db.query(sql)
      .then((data)=>{
          res.send(data.rows);
      })
      .catch((err)=>{
        console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving data.' });
    })
  }


const sau=async (req, res) => {
    // Get the user ID from the query parameter
    const userId = req.query.user_id;
  
    try {
      // Query the database to fetch subjects data for the specified user
      const queryText = 'SELECT subject_name, pass_mark, student_mark ,user_idFROM student WHERE user_id = $1';
      const { rows } = await db.query(queryText, [userId]);
      res.json(rows);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving data.' });
    }
  }


const getStudent=(req, res) => {
    const sql = 'SELECT user_id FROM student';
      db.query(sql)
      .then((data)=>{
          res.send(data.rows);
      })
      .catch((err)=>{
        console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving data.' });
    })
  }


const signSubject=async (req, res) => {
    const { studentId, subjectId } = req.body;
  
    try {
      // Check if the student and subject exist (you should add this validation)
      // Then, insert a new record into the junction table
      const query = 'INSERT INTO student_subjects (student_id, subject_id) VALUES ($1, $2)';
      await db.query(query, [studentId, subjectId]);
  
      res.status(200).json({ success: true, message: 'Subject assigned to student successfully.' });
    } catch (error) {
      console.error('Error assigning subject:', error);
      res.status(500).json({ success: false, error: 'Failed to assign subject to student.' });
    }
  }

const userUpdate=(req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
  
    
    const { username, email, is_active, role } = updatedUserData;
  
   
    const sql = `
      UPDATE user_credentials
      SET username = $1, email = $2, is_active = $3, role = $4
      WHERE id = $5`;
  
    db.query(sql, [username, email, is_active, role, userId], (error, result) => {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    });
  }

const deleteUser=(req, res) => {
    const userId = req.params.id;
  
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
  
    // Construct the SQL query to delete the user
    const sql = 'DELETE FROM  user_credentials WHERE id = $1';
  
    // Execute the SQL query
    db.query(sql, [userId], (error, result) => {
      if (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
  }

module.exports ={handleRegistration,handleAddSubject,handleGetData,handleGetassign,logIn,addsubject,getSubject,
            sau,getStudent,signSubject,userUpdate,deleteUser}