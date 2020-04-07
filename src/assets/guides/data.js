import washing from '../hand.jpg';
import sneezing from '../sneezing.jpg';
import avoid from '../avoid.jpg';
import face from '../face.jpg';
import doctor from '../doctor.jpg';
import home from '../home.png';
import clean from '../clean.png';
const  data = {
    "stepOne": {
        picture: washing,
        text: "Wash your hands frequently using soap and water. If soap is not available, alcohol based hand gel or cold ashe may be used to wash away germs.",
    } ,
    "stepTwo": {
        picture: sneezing,
        text: "When coughing or sneezing, cover your mouth or nose with a tissue or your bent elbow. Try not to sneeze and cough  into your hands because then you will spread the virus with your hands. Throw the tissue into a bin. If you cough/sneeze into your hand, don't touch anything and immediately was your hands with soap and water.",
    },
    "stepThree":{
        picture: avoid,
        text: "Avoid close contact with anyone who is coughing, sneezing, or is sick. Keep at least 1 (3 feet) distance and encourage them to go to a nearby healthcare center.",
    },
    "stepFour":{
        picture: face,
        text:  "Avoid touching eyes, nose and mouth. Hands touch many surfaces which can be contaminated with the virus. If you touch your eyes, nose or mouth with your contaminated hands, you can transfer the virus from the surface to yourself.",
    },
    "stepFive":{
        picture: doctor,
        text:  "Go to the doctor if you have a fever, cough or feel that it is difficult to breath. This is the best way to look after yourself and stop the infection spreading to your family and others. Make sure to first call the toll-free number 114 and let them know your symptoms so you don't infect other people.",
    },
    "stepSix": {
        picture: home,
        text: "Stay home when you are sick.",
    },
    "stepSeven":{
        picture: clean,
        text:  "Clean and disinfect frequently touched objects and surfaces with chlorine- or alcohol-containing cleaning solutions. It is not yet known if and how long the virus lasts on surfaces, but a disinfectant with 70% alcohol can kill it.",
    }

}
export default data;