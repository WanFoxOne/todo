import moment from 'moment';

export default ( { app }, inject ) => {
    moment.locale( 'fr' );
    inject( 'moment', moment );
};

