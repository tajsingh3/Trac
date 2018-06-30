import React, { Component } from 'react';
import Spinner from '../UI/Spinner/Spinner';
import { Link } from 'react-router-dom'; 

import classes from './TracTable.css';

class TracTable extends Component {

    state={
        rows:null
    }

    componentDidMount=()=>{
        this.setState({
            rows:{
                countDataCols:[
                    'Approved',
                    'Unapproved',
                    'Expired',
                    'Unexpired',
                    'Regulatory',
                    'Non Regulatory',
                    'Daily Frequency',
                    'Weekly Frequency',
                    'Monthly Frequency',
                    'Annual Frequency'
                ],
                sbuCols:[
                    'Corporate',
                    'Retail'
                ],
                sbus:{
                    'Corporate':{
                        'Approved':4,
                        'Unapproved':0,
                        'Expired':1,
                        'Unexpired':4,
                        'Regulatory':4,
                        'Non Regulatory':0,
                        'Daily Frequency':0,
                        'Weekly Frequency':0,
                        'Monthly Frequency':0,
                        'Annual Frequency':4
                    },
                    'Retail':{
                        'Approved':5,
                        'Unapproved':0,
                        'Expired':0,
                        'Unexpired':4,
                        'Regulatory':4,
                        'Non Regulatory':0,
                        'Daily Frequency':0,
                        'Weekly Frequency':0,
                        'Monthly Frequency':0,
                        'Annual Frequency':0
                    }
                }              
            }
        });
    }

    createTableRows=()=>{
        let countDataCols=this.state.rows.countDataCols;
        let sbuCols=this.state.rows.sbuCols;
        let allSbuData=this.state.rows.sbus;
        let trRows=[];
        for(let countDataCol of countDataCols){
            let tdRow=[];
            tdRow.push(<td>{countDataCol}</td>);
            for(let sbuCol of sbuCols){              
                let sbuData=allSbuData[sbuCol];
                let classHighlight=this.addExpiredHighlight(countDataCol,sbuData);
                tdRow.push(
                    <td className={classHighlight}>
                        <Link to={{
                                    pathname:'/detailed-view-table',
                                    search:'?description=policy&sbu='+sbuCol+'&counter='+countDataCol
                                }}>
                                    {sbuData[countDataCol]}
                        </Link>
                    </td>
                );
            }
            trRows.push(<tr>{tdRow}</tr>);
        }
        return trRows;
    }

    addExpiredHighlight=(countDataCol,sbuData)=>{
        const EXPIRED_LIMIT=1;
        let classHighlight=null;
        if(countDataCol==='Expired'){
            let expiredValue=sbuData[countDataCol];
            if(expiredValue>=EXPIRED_LIMIT){
                classHighlight=classes.AlertHighlight;
            }
        }
        return classHighlight;
    }

    render(){
        let trRows=<Spinner/>;
        if(this.state.rows){
            trRows=this.createTableRows();
        }
        return (
            <div>
                <table>
                    <tr>
                        <th>Count Data</th>
                        <th>Corporate</th>
                        <th>Retail</th>
                    </tr>            
                    {trRows}
                </table>
            </div>
        );
    }
}

export default TracTable;