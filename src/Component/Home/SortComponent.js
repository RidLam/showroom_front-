import React, { Component } from 'react';

export class SortComponent extends Component{

    render() {
        return(
            <Child userList={[{firstname: "aidouan",lastname: "Lamghari"},{firstname: "Donald", lastname:"Lrump"}]} />
          )
    }
}


class Child extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        var user = this.props.userList;
       
        return(
            <div>
                <p>userlist</p>
                {
                    user
                    .sort((a,b)=> {
                        if(a.lastname < b.lastname) { return -1; }
                        if(a.lastname > b.lastname) { return 1; }
                        return 0;
                    })
                    .map((item, index) => {
                        return (
                            <ul>
                            <li key={index}>{item.lastname} {item.firstname} </li>
                        </ul>
                        )
                    })
                }
            </div>

        )
    }
}