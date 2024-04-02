import { Navigate, Outlet } from "react-router-dom";
import { SessionService } from "@services/session.service";
import { useSnackbar } from "notistack";

const PrivateRouteGuard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const session = SessionService.getSession();
  if (!session) {
    enqueueSnackbar("Se ha perdido la sesión", { variant: "warning" });
  }
  return <>{!!session ? <Outlet /> : <Navigate to="/login" />} </>;
};

export default PrivateRouteGuard;
