import { SessionService } from "@services/session.service";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouteGuard = () => {
  const session = SessionService.getSession();
  return <>{!session ? <Outlet /> : <Navigate to="/" />} </>;
};

export default PublicRouteGuard;
