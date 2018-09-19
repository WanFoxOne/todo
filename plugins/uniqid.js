import uniqid from 'uniqid';

export default ( context, inject ) => {
    inject( 'uniqid', uniqid );
}
