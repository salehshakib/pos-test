function PrivateRoute({ children }) {
  // const token = useSelector(useCurrentToken);
  // const dispatch = useDispatch();

  // if (!token) {
  //   dispatch(logout());
  //   return <Navigate to={'/login'} replace={true} />;
  // }
  return children;
}

export default PrivateRoute;
