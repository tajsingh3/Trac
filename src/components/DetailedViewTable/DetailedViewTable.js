import React, { Component } from 'react';
import axios from 'axios';

class DetailedViewTable extends Component{
    state={
        rows:null,
        description:null,
        sbu:null,
        counter:null,
        data:null      
    }

    componentDidMount=()=>{
        const query = new URLSearchParams(this.props.location.search);
        let description=null;
        let sbu=null;
        let counter=null;

        for (let param of query.entries()) {
            switch(param[0]){
                case 'description':
                    description=param[1];
                    break;
                case 'sbu':
                    sbu=param[1];
                    break;
                case 'counter':
                    counter=param[1]
                    break;
                default:
                    console.log('Error: query string params do not match anything');
            } 
        }

        axios.get(`http://127.0.0.1:8000/sbulist/${description}/${sbu}/${counter}`)
            .then((response)=>{
                this.setState({data:response.data});
            })
            .catch((error)=>{
                console.log(error);
            });

        this.setState({
            description:description,
            sbu:sbu,
            counter:counter
        });
    }

    render(){
        return (
            <div>
                <h1>DetailedViewTable</h1>
                <p>filter trac table base on...</p>
                <p>description: {this.state.description}</p>
                <p>sbu: {this.state.sbu}</p>
                <p>counter name: {this.state.counter}</p>                        
            </div>
        );
    }
}

export default DetailedViewTable;