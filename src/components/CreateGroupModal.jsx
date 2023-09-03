import { useState, useRef } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import api from '../API/api'
const CreateGroupModal = ({allAccounts, allGroups, setAllGroups}) => {
    const [allGroupAccount, setAllGroupAccount] = useState({
        groupName: '',
        groupAccounts: []
    })
    const navigate = useNavigate()
    const groupName = useRef()
    const joinGroupEmailInput = useRef()
    const createGroupButton = useRef()
    function JoiningGroupAccount({account}){
        return(
            <button onClick={() => {
                var newEmail = allGroupAccount.groupAccounts
                newEmail.splice(allGroupAccount.groupAccounts.indexOf(account), 1)
                setNewGroup(groupName.current.value, newEmail)
            }}
            data-bs-toggle="tooltip" data-bs-html="true" title="Click to remove"
            className="badge border border-0 btn-secondary m-1 emailGroupButton" style={{fontSize:'17px'}}>{account}</button>
        )
    }
    function RecommendAccount({account}) {
        return(
            <>
                <option value={account.email}/>
            </>
        )
    }
    function checkEmailInSystem(email){
        for(var i = 0; i < allAccounts.length;i++){
            if(allAccounts[i].email === email) {
                return true
            }
        }
        return false
    }
    function setNewGroup(groupName, groupAccounts){
        setAllGroupAccount({
            groupName: groupName,
            groupAccounts: groupAccounts
        })

    }
    
    function createGroup(){
        createGroupButton.current.disabled = true
        axios.post(api.createGroup,{
            _id: sessionStorage.getItem("AccountID"),
            groupName: allGroupAccount.groupName,
            groupAccounts: allGroupAccount.groupAccounts
        },{
            headers: {
                withCredentials: true
            }
        }).then(res => {
            if(res.data === null){
                alert("Failed to create new group, please try again")
            }
            let newGroup = [...allGroups, res.data]
            setAllGroups(newGroup)
            createGroupButton.current.disabled = false
            navigate(`/message/g/${res.data._id}`)
        })
    }
    
    return(
        <div className="modal fade" id="creatingGroupModal" tabIndex="-1" aria-labelledby="creatingGroupModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-dark">
                    <div className="modal-header">
                        <h5><FontAwesomeIcon icon="fa-solid fa-people-group" /> &nbsp;Create new group</h5>
                    </div>
                    <div className="m-0 p-2 row modal-body">
                        <div className="col-12 mb-2">
                            <input ref={groupName} type="text" required placeholder="Insert group name" className="fw-bold text-dark form-control form-control-lg"/>
                        </div>
                        <div className="col-12 m-0 mb-2 input-group">
                            <input ref={joinGroupEmailInput} type="email" required list="datalistOptions" placeholder="Invite your teamate" className="fw-bold text-dark form-control form-control-lg"/>
                            <button className="btn btn-secondary rounded-end" onClick={() => {
                                if(allGroupAccount.groupAccounts.includes(joinGroupEmailInput.current.value)){ return }
                                if(joinGroupEmailInput.current.value === '') { return }
                                if(checkEmailInSystem(joinGroupEmailInput.current.value) === false) { return }
                                let newEmail = [...allGroupAccount.groupAccounts, joinGroupEmailInput.current.value]
                                setNewGroup(groupName.current.value, newEmail)
                                joinGroupEmailInput.current.value = ''
                            }}>Add</button>
                            <datalist id="datalistOptions">
                                {allAccounts.map(account => <RecommendAccount key={account._id} account={account}/>)}
                            </datalist>
                        </div>
                        <div className="col-12 mb-2">
                            <div className="fw-bold text-dark form-control" style={{minHeight:'100px'}}>
                                <span className="badge bg-secondary m-1" style={{fontSize:'17px'}}>@You</span>
                                {allGroupAccount.groupAccounts.map(account => <JoiningGroupAccount key={account} account={account}/>)}
                            </div>
                        </div>
                        <div className="col-12 mb-2">
                            <button data-bs-dismiss="modal" data-bs-target="#creatingGroupModal" aria-label="Close" ref={createGroupButton} disabled={allGroupAccount.groupAccounts.length>0 && allGroupAccount.groupName !== ''? false:true} onClick={ createGroup } className="w-100 btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateGroupModal