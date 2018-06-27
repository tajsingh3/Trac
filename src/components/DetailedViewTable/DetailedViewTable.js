import React, { Component } from 'react';

class DetailedViewTable extends Component{
    state={
        rows:null,
        type:null,
        sbu:null,
        counter:null      
    }

    componentDidMount=()=>{
        const query = new URLSearchParams(this.props.location.search);
        let type=null;
        let sbu=null;
        let counter=null;
        for (let param of query.entries()) {
            switch(param[0]){
                case 'type':
                    type=param[1];
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
        this.setState({
            type:type,
            sbu:sbu,
            counter:counter
        });
    }

    render(){
        return (
            <div>
                <h1>DetailedViewTable</h1>
                <p>filter trac table base on...</p>
                <p>type: {this.state.type}</p>
                <p>sbu: {this.state.sbu}</p>
                <p>counter name: {this.state.counter}</p>                        
            </div>
        );
    }
}

export default DetailedViewTable;