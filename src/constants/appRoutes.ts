interface AppRoutes {
  index:string;
  signUp: string;
  catalog: string;
  [key: string] : string;
}

export const appRoutes: AppRoutes = {
  index: "/",
  signUp: "/sign-up",
  catalog: "/catalog"
}