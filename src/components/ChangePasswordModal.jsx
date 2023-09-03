import { useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import api from "../API/api"
const ChangePasswordModal = () => {
    const changePasswordButton = useRef()
    const changePassword = useRef()
    const confirmPassword = useRef()
    useEffect(() => {
        changePasswordButton.current.disabled = true
    }, [])
    const checkChangePasswordButton = () => {
        if (
            validate(changePassword.current.value.trim()) === true &&
            changePassword.current.value.trim() ===
                confirmPassword.current.value.trim()
        ) {
            changePasswordButton.current.disabled = false
        } else {
            changePasswordButton.current.disabled = true
        }
    }

    const validate = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return regex.test(password)
    }
    const changeNewPassword = async () => {
        const result = await axios.put(api.updateNewPassword, {
            _id: sessionStorage.getItem("AccountID"),
            password: changePassword.current.value,
        },{
            headers: {
                withCredentials: true
            }
        })
        changePassword.current.value = ''
        confirmPassword.current.value = ''
        if (result.data === null) {
            alert("Successfully update new password, please login again")
            sessionStorage.removeItem("AccountID")
            window.location.reload()
        } else {
            alert(result.data.message)
        }
    }
    return (
        <div
            className="modal fade"
            id="changePasswordModal"
            tabIndex="-1"
            aria-labelledby="changePasswordModal"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-dark">
                    <div className="modal-header">
                        <h5>
                            Change your new password&nbsp;
                            <FontAwesomeIcon icon="fa-solid fa-key" />
                        </h5>
                    </div>
                    <div className="m-0 p-2 row modal-body">
                        <div className="col-12 mb-2">
                            <input
                                ref={changePassword}
                                onChange={checkChangePasswordButton}
                                type="password"
                                required
                                placeholder="At least 8 characters, 1 number and 1 letter"
                                className="fw-bold text-dark form-control form-control-lg"
                            />
                        </div>
                        <div className="col-12 mb-2">
                            <input
                                ref={confirmPassword}
                                onChange={checkChangePasswordButton}
                                type="password"
                                required
                                placeholder="confirm password"
                                className="fw-bold text-dark form-control form-control-lg"
                            />
                        </div>
                        <div className="col-12 mb-2">
                            <button
                                ref={changePasswordButton}
                                data-bs-dismiss="modal"
                                data-bs-target="changePasswordModal"
                                className="w-100 btn btn-primary"
                                data-dismiss="modal"
                                onClick={changeNewPassword}>
                                Change password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordModal
