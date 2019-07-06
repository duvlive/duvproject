import MCs from 'data/entertainers/mcs';
import DJs from 'data/entertainers/djs';
import LiveBands from 'data/entertainers/live-bands';
import { shuffleItems } from 'utils/helpers';

export default shuffleItems([...MCs, ...DJs, ...LiveBands]);
