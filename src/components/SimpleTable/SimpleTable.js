import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

import classesH from './SimpleTable.css'; 

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends Component {

    state={
        data:null
    };

    componentDidMount=()=>{
        axios.get('http://127.0.0.1:8000/sbuset/')
            .then((response)=>{
                console.log(response.data);
                this.setState({data:response.data})
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    cleanRowName=(rowName)=>{
        let cleanedRowName = null;

        switch(rowName){
            case 'approved':
                cleanedRowName = 'Approved';
                break;
            case 'unapproved':
                cleanedRowName = 'Unapproved';
                break;
            case 'expired_yes':
                cleanedRowName = 'Expired';
                break;
            case 'expired_no':
                cleanedRowName = 'Unexpired';
                break;
            case 'reg_yes':
                cleanedRowName = 'Regulatory';
                break;
            case 'reg_no':
                cleanedRowName = 'Non Regulatory';
                break;
            case 'freq_daily':
                cleanedRowName = 'Daily Frequency';
                break;
            case 'freq_weekly':
                cleanedRowName = 'Weekly Frequency';
                break;
            case 'freq_monthly':
                cleanedRowName = 'Monthly Frequency';
                break;
            case 'freq_annually':
                cleanedRowName = 'Annual Frequency';
                break;
            default:
                cleanedRowName = rowName;
        }

        return cleanedRowName;
    }

    createTableRows=()=>{
        let rowNames=[
            'approved',
            'unapproved',
            'expired_yes',
            'expired_no',
            'reg_yes',
            'reg_no',
            'freq_daily',
            'freq_weekly',
            'freq_monthly',
            'freq_annually'
        ];
        let colNames=[
            'corporate',
            'retail',
            'treasury',
            'financial',
            'operations',
            'humanResources',
            'investments',
            'rmc',
            'accounts',
            'infotech'
        ];
        let allSbuData=this.state.data;
        let trRows=[];
        
        for(let rowName of rowNames){
            let tdRow=[];
            tdRow.push(<TableCell>{this.cleanRowName(rowName)}</TableCell>);
            for(let colName of colNames){              
                let sbuData=allSbuData[colName];
                let classHighlight=this.addExpiredHighlight(rowName,sbuData);
                tdRow.push(
                    <TableCell className={classHighlight}>
                        <Link to={{
                                    pathname:'/detailed-view-table',
                                    search:'?description=policy&sbu='+colName+'&counter='+rowName
                                }}>
                                    {sbuData[rowName]}
                        </Link>
                    </TableCell>
                );
            }
            trRows.push(<TableRow>{tdRow}</TableRow>);
        }
        return trRows;
    }

    addExpiredHighlight=(countDataCol,sbuData)=>{
        const EXPIRED_LIMIT=1;
        let classHighlight=null;
        
        if(countDataCol==='expired_yes'){
            let expiredValue=sbuData[countDataCol];
            if(expiredValue>=EXPIRED_LIMIT){
                classHighlight=classesH.AlertHighlight;
            }
        }
        return classHighlight;
    }

    render(){
        const { classes } = this.props;
        let table=<Spinner/>;

        if(this.state.data){
            let trRows=this.createTableRows();
            table = (
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Count Data</TableCell>
                                    <TableCell >Corporate</TableCell>
                                    <TableCell >Retail</TableCell>
                                    <TableCell >Treasury</TableCell>
                                    <TableCell >Financial</TableCell>
                                    <TableCell >Operations</TableCell>
                                    <TableCell >Human Resources</TableCell>
                                    <TableCell >investments</TableCell>
                                    <TableCell >Rmc</TableCell>
                                    <TableCell >Accounts</TableCell>
                                    <TableCell >infotech</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trRows}
                            </TableBody>
                        </Table>
                    </Paper>
            );
        }

        return (table);
    }  
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);