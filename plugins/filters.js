import Vue from 'vue';

Vue.filter(
    'capitalize', function ( value ) {
        if ( !value ) return '';
        value = value.toString();
        return value.charAt( 0 ).toUpperCase() + value.slice( 1 );
    }
);

Vue.filter(
    'max', function ( value, max ) {
        if ( !value ) return '';
        if ( value.length >= max ) {
            return `${value.substring( 0, (max >= 4) ? max - 4 : max )} ...`;
        }
        return value;
    }
);
