

export default {
    login(email, password) {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await fetch('/users.json');
            const users = await response.json();
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
              resolve({
                user: { name: user.name },
              });
            } else {
              reject('Invalid email or password.');
            }
          } catch (error) {
            reject('Error loading user data.');
          }
        }, 1000); 
      });
    },
  
    logout() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Logged out');
        }, 500);
      });
    },
     fetchUser() {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await fetch('/users.json');
            const users = await response.json();
  
            const loggedInUser = users[0]; 
  
            if (loggedInUser) {
              resolve({
                user: { name: loggedInUser.name, email: loggedInUser.email },
              });
            } else {
              reject('No user logged in.');
            }
          } catch (error) {
            reject('Error fetching user data.');
          }
        }, 1000); 
      });
    }
  };