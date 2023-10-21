import { Suspense, lazy, useEffect } from "react"
import { Route, Routes } from "react-router"
import ToastDemo from "./components/Toast"
import useSetUsers from "./hooks/useSetUsers"
import Loader from "./components/Loader"
import { useDispatch, useSelector } from "react-redux"
import Modal from "./components/Modal"
import { useSearchParams } from "react-router-dom"
import { showModalActions } from "./store/store"

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const FavPage = lazy(() => import("./pages/Fav"))

function App() {
  useSetUsers()
  const loading = useSelector(state => state.loadingScreen.loading)
  const showModal = useSelector(state => state.showModal.showModal)
  const [params] = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {

    if (params.get("id")) {
      dispatch(showModalActions.setShowModal(true))
    } else {
      dispatch(showModalActions.setShowModal(false))
    }
  }, [params])

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fav" element={<FavPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastDemo />
        {loading && <Loader />}
        {showModal && <Modal />}
      </Suspense>
    </>
  )
}

export default App
