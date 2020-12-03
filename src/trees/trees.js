import newEucalyptus from "./eucalyptus";
import newOak from "./oak";
import newPine from "./pine";
import newFlame from "./flame_of_the_forrest";
import newAcacia from "./acacia";
import newDead from "./dead";
import newOther from "./other_tree";

// Trees["tree"]()
const Trees = {
  eucalyptus: newEucalyptus,
  oak: newOak,
  pine: newPine,
  flame: newFlame,
  acacia: newAcacia,
  dead: newDead,
  other: newOther,
};

export default Trees;
