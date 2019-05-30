import React from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination'


const User = ({user, handleDelete, handleEdit}) => (
    <tr >
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.age}</td>
        <td>{user.gender}</td>
        <td>
        <button type="button" className="btn btn-outline-primary" id="edit-btn" onClick = {() => handleEdit(user._id)}>
            <i className="fas fa-edit" />
            Edit
        </button>
        </td>
        
        <td>
        <button type="button" className="btn btn-outline-secondary" id="delete-btn" onClick = {() => handleDelete(user._id)}>
            <i className="fas fa-trash-alt" />
            Delete
        </button>
        </td>
    </tr>
)

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search: "",
            firstAcen : true,
            lastAcen : true,
            sexAcen : true,
            ageAcen : true
        };
    }
    
    componentDidMount() {
        this.props.getList();
        this.setState({ users: this.props.users });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({users: nextProps.users});
    }

    handleChange = e => {
        this.setState({ search: e.target.value });
    }

    isMatch = (user) => {
        return(
            user.first_name.search(new RegExp(this.state.search, "i")) !== -1 || 
            user.last_name.search(new RegExp(this.state.search, "i")) !== -1 || 
            user.gender.search(new RegExp("^"+this.state.search+"$", "i")) !== -1     
        )
    }

    handleDelete = (userId) => {
        this.props.deleteUser(userId);
    }

    handleEdit = (id) => {
        this.props.getDetail(id);
        this.props.history.push(`/edit/${id}`);    
    }

    handleClickAdd = () => {
        this.props.history.push("/add");
    };

    sortFirst = () => {
        const {firstAcen, users} = this.state
        let newArr = users;
        if(firstAcen) {
            newArr.sort((o1, o2) => {
                return o1.first_name.localeCompare(o2.first_name);
            })
        }
        else {
            newArr.sort((o1, o2) => {
                return o2.first_name.localeCompare(o1.first_name);
            })
        }
        this.setState({users : newArr , firstAcen : !firstAcen}) 
    }

    sortLast = () => {
        const {lastAcen, users} = this.state
        let newArr = users;
        if(lastAcen) {
            newArr.sort((o1, o2) => {
                return o1.last_name.localeCompare(o2.last_name);
            })
        }
        else {
            newArr.sort((o1, o2) => {
                return o2.last_name.localeCompare(o1.last_name);
            })
        }
        this.setState({users : newArr , lastAcen : !lastAcen}) 
    }

    sortSex = () => {
        const {sexAcen, users} = this.state
        let newArr = users;
        if(sexAcen) {
            newArr.sort((o1, o2) => {
                return o1.gender.localeCompare(o2.gender);
            })
        }
        else {
            newArr.sort((o1, o2) => {
                return o2.gender.localeCompare(o1.gender);
            })
        }
        this.setState({users : newArr , sexAcen : !sexAcen}) 
    }

    sortAge = () => {
        const {ageAcen, users} = this.state
        let newArr = users;
        if(ageAcen) {
            newArr.sort((o1, o2) => {
                return Number(o1.age) - Number(o2.age);
            })
        }
        else {
            newArr.sort((o1, o2) => {
                return Number(o2.age) - Number(o1.age);
            })
        }
        this.setState({users : newArr , ageAcen : !ageAcen}) 
    }

    render(){
        const {firstAcen , lastAcen, ageAcen , sexAcen} = this.state;

        return (  
            <div> 
                <div>
                    <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
                </div>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th onClick = {this.sortFirst}>{firstAcen? <i class="fas fa-sort-alpha-up"></i> : <i class="fas fa-sort-alpha-down"></i>}First Name</th>
                            <th onClick = {this.sortLast}>{lastAcen? <i class="fas fa-sort-alpha-up"></i> : <i class="fas fa-sort-alpha-down"></i>}Last Name</th>
                            <th onClick = {this.sortAge}>{ageAcen? <i class="fas fa-sort-numeric-up"></i> : <i class="fas fa-sort-numeric-down"></i>}Age</th>
                            <th onClick = {this.sortSex}>{sexAcen? <i class="fas fa-sort-alpha-up"></i> : <i class="fas fa-sort-alpha-down"></i>}Gender</th>
                            
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            this.state.users.filter((user) => this.isMatch(user)).map((eachUser, idx) => {
                                return (<User 
                                    user = {eachUser} 
                                    key = {idx} 
                                    handleDelete={this.handleDelete} 
                                    handleEdit={this.handleEdit}
                                />);
                            })
                        }
                    </tbody>
                </Table>
                <div>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                    </Pagination>
                </div>               
            </div>
    
        ); 
    
    }
}

//connect redux to component
const mapStateToProps = state => (
    {
        users: state.list.data,
        detail: state.detail.data,
        err: state.list.err
    }
);

const mapDispatchToProps = dispatch => (
    {
        getList: () => {
            dispatch(actions.getList());
        },
        deleteUser: (userId) => {
            dispatch(actions.deleteUser(userId));
        },
        getDetail: (userId) => {
            dispatch(actions.getDetail(userId));
        }
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
