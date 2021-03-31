import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import DataTable from './DataTable';

const buttonRef = React.createRef();

export default class Parser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csv: []
    };
  }

  handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = data => {
    // console.log('DATA: ' + JSON.stringify(data));
    this.setState({ csv: data });
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  render() {
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          isReset={true}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '30px'
              }}
            >
              <button
                className="upload-button"
                type="button"
                onClick={this.handleOpenDialog}
              >
                Upload
              </button>
            </aside>
          )}
        </CSVReader>
        <DataTable result={this.state.csv} />
      </>
    );
  }
}
