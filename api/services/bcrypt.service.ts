import bcrypt from "bcrypt";

const bcryptService = () => {
  const password = (pw: string) => {
    console.log(pw);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pw, salt);

    return hash;
  };

  const comparePassword = (pw: string, hash: string) =>
    bcrypt.compareSync(pw, hash);

  return {
    password,
    comparePassword,
  };
};

export default bcryptService;
