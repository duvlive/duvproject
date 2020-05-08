const UserValidation = {
  nameValidation(firstName, lastName) {
    let error = {};
    if (firstName.length < 3) {
      error['firstName'] =
        'Firstname length must have a minimum of 3 characters';
    }

    if (lastName.length < 3) {
      error['lastName'] = 'Lastname length must have a minimum of 3 characters';
    }
    return error;
  },

  emailValidation(email) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return {
        email: 'Email is not rightly formatted',
      };
    }
    return {};
  },
  phoneNumberValidation(phoneNumber) {
    if (phoneNumber.length < 11 && phoneNumber.length > 14) {
      return {
        phoneNumber: 'Phone Number length must be between 11 and 14 characters',
      };
    }
    return {};
  },
  passwordValidaton(password, confirmPassword) {
    let error = {};
    if (password.length < 6) {
      error['password'] = 'Password length must have a minimum of 6 characters';
    }

    if (password !== confirmPassword) {
      error['passwordConfirmation'] = 'Password does not match';
    }
    return error;
  },
  singlePasswordValidaton(password) {
    let error = {};
    if (password.length < 6) {
      error['password'] = 'Password length must have a minimum of 6 characters';
    }
    return error;
  },
  isUserActive(isActive) {
    let error = {};
    if (!isActive) {
      error['isActive'] = 'User needs to activate account';
    }
    return error;
  },
};

export default UserValidation;
