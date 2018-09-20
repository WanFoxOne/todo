import Vue from 'vue';
import { Validator, install } from 'vee-validate';

Vue.use( install );

Validator.extend( 'required', {
    getMessage( field, params, data ) {
        return (data && data.message) || 'Le champ est requis';
    },
    validate( value ) {
        return !!value;
    }
} );
