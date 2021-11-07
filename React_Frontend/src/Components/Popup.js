import React from 'react';

export default function Popup(props){
    return(
        <div id="deletemodal" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-lg" role="content">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Delete </h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                    <div className="form-row">
                                        <span>Are you sure you want to delete?</span>
                                        <button type="button" className="btn btn-secondary btn-sm ml-auto" data-dismiss="modal">Cancel</button>
                                        <button className='btn btn-danger' data-dismiss="modal" onClick={props.df}>Delete</button>
                                    </div>
                            </div>
                        </div>
                    </div>
        </div>   
    )
}