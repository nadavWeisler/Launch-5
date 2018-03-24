import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <div>
          <h1 style={{color:'#5F4B8B',}}><strong>
            Launch5
          </strong></h1>
          <h3>
            דרך מודרנית להציף אנשים
          </h3> 
          <h4>
            חברי הכנסת ומובילי הדעה לא יוכלו עוד להתעלם מכם: שגרו הודעה במהירות ובפשטות
          </h4>

          <br/>

          <div style={{alignItems:"center"}}>
                <div className="col-md-3">
                </div>
                <div className="col-md-2">
                  <div>
                    <h2><i className="material-icons">settings</i></h2>
                    <h4><strong>מהו שיגור?</strong></h4>
                    <p>
                      שיגור הוא הודעה מוכנה מראש לנמען שתקבעו ל-48 שעות בלבד  
                    </p>
                  </div>
                </div>

                <div className="col-md-2">
                  <div>
                    <h2><i className="material-icons">flash_on</i></h2>
                    <h4><strong>מהירות</strong></h4>
                    <p>
                      בלחיצה אחת כל אחד יוכל לשלוח הודעה מוכנה מראש לנמען שקבעתם 
                    </p>
                  </div>
                </div>

                <div className="col-md-2">
                  <div>
                    <h2><i className="material-icons">group</i></h2>
                    <h4><strong>חברתיות</strong></h4>
                    <p>
                     יחד נוכל להשפיע על גורמי הכוח ולדאוג לאינטרסים שלנו, הציבור 
                    </p>
                  </div>
                </div>
              </div>
        </div>
        
      </div>
    );
  }
}

export default Home;
