import main from '../main'
import router from '../routers/auth'
import {getDeviceId, setDeviceId} from '@/utils/auth';
import {guidGenerator} from '@/utils';

if (!getDeviceId()) {
    setDeviceId(guidGenerator())
} 
main( {layout: 'auth-layout'}, router)