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
        data:{
            rowNames:[
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
            colNames:[
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
    }

    createTableRows=()=>{
        let rowNames=this.state.data.rowNames;
        let colNames=this.state.data.colNames;
        let allSbuData=this.state.data.sbus;
        let trRows=[];
        for(let rowName of rowNames){
            let tdRow=[];
            tdRow.push(<TableCell numeric>{rowName}</TableCell>);
            for(let colName of colNames){              
                let sbuData=allSbuData[colName];
                let classHighlight=this.addExpiredHighlight(rowName,sbuData);
                tdRow.push(
                    <TableCell numeric className={classHighlight}>
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
        if(countDataCol==='Expired'){
            let expiredValue=sbuData[countDataCol];
            if(expiredValue>=EXPIRED_LIMIT){
                classHighlight=classesH.AlertHighlight;
            }
        }
        return classHighlight;
    }

    render(){
        const { classes } = this.props;
        let trRows=this.createTableRows();

        return (
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric>Count Data</TableCell>
                            <TableCell numeric>Corporate</TableCell>
                            <TableCell numeric>Retail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trRows}
                    </TableBody>
                </Table>
                </Paper>
        );
    }  
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);