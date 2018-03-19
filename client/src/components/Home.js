import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app" style={{textAlign:'center'}}>
        <div className="container">
          <br/>
          <h1 className="header center red-text">
            ברוכים הבאים ל-Launch5
          </h1>
          <div className="row center">
            <h5 className="header col s12 light">
              דרך מודרנית להציף אנשים
            </h5>
          </div>
          <div className="row center">
            <NavLink className=" btn-large waves-effect waves-light red white-text"
              to='/create'>
                צור שיגור
            </NavLink>
          </div>
          <div className="container">
            <div className="section">
              <div className="row">
                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text"><i className="material-icons">flash_on</i></h2>
                    <h5 className="center">מהירות</h5>
                    <p className="light">
                      שיגור יהיה פתוח ליומיים, וביומיים האלו אדם יוכל במהירות ובלחיצה אחת לשלוח הודעה למי שתבחרי
                    </p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text"><i className="material-icons">group</i></h2>
                    <h5 className="center">חברתיות</h5>

                    <p className="light">
                      יחד נוכל להשפיע על גורמי הכוח ולדאוג לאינטרסים שלנו, הציבור
                    </p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text"><i className="material-icons">settings</i></h2>
                    <h5 className="center">פשטות</h5>
                    <p className="light">
                    במילוי טופס פשוט תוכלי ליצור הודעה שתגיע ממספר נמענים למי שתבחר
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
        
      </div>
    );
  }
}

export default App;
