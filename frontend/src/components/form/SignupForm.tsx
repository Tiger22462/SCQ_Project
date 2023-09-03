"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlertDialog from "../alert/AlertDialog";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Divider from "@mui/material/Divider";
type UserLogin = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

export default function SignupForm() {
  const initialUserLogin = {
    username: "",
    email: "",
    phone: "",
    password: "",
  };
  const [userLogin, setUserLogin] = useState<UserLogin>(initialUserLogin);
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username: userLogin.username,
        password: userLogin.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = () => {
    console.log("user loginer", userLogin);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-4/5 rounded-[30px] px-[136px] min-w-[560px] bg-whiteopa-800 desktop:w-2/4 tablet:w-3/4 phone:w-3/4 shadow-lg">
      <Typography component="h1" variant="h3" className="font-bold">
        Formify
      </Typography>
      <Typography component="h1" variant="h5">
        Create an account
      </Typography>

      <form onSubmit={handleSubmit} className="flex flex-col w-full mt-16 gap-3">
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-username">
            Username
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            type="text"
            label="username"
            onChange={(e) => {
              setUserLogin({ ...userLogin, username: e.target.value });
            }}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">
            Email
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type="email"
            label="email"
            onChange={(e) => {
              setUserLogin({ ...userLogin, email: e.target.value });
            }}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-phone">
            Phone number
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-phone"
            type="tel"
            label="phone number"
            onChange={(e) => {
              setUserLogin({ ...userLogin, phone: e.target.value });
            }}
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePassword}
                  onMouseDown={handleTogglePassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => {
              setUserLogin({ ...userLogin, password: e.target.value });
            }}
          />
        </FormControl>
      
        <div className="mt-3 ">
          <Button
            fullWidth
            variant="contained"
            className="bg-black hover:bg-black mb-2"
            onClick={handleSubmit}
          >
            Sign up
          </Button>
          {error && (
            <AlertDialog title={error} type="error" />
          )}
        </div>

        <Grid container justifyContent="center">
          <Grid item>
            <Link href="#" className="text-center">
              {"Already have an Account? "}<strong>Login</strong>
            </Link>
          </Grid>
        </Grid>
      </form>

    </div>
  );
}
