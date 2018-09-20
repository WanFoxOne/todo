<template>
    <section class="container gap">

        <div
            class="columns is-multiline is-mobile"
            v-if="get_sorted_list.length">

            <template v-for="(item, index) of anchored_list">

                <!-- Smart divider -->
                <div
                    class="column is-full"
                    :key="index"
                    v-if="item.anchor">

                    <div class="inline-grid">
                        <nuxt-link
                            class="button is-primary"
                            :to="{path: 'create', params: { date:item.task.date } }">Ajouter une tâche
                        </nuxt-link>
                        <div
                            class="is-divider"
                            :data-content="item.anchor | capitalize"></div>
                    </div>

                </div>
                <!-- END Smart divider -->

                <!-- Task -->
                <div
                    class="column is-full-mobile is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                    :key="item.task.id"
                    :id="item.task.id">
                    <task
                        :task="item.task"
                        :list="true"/>
                </div>
                <!-- END Task -->

            </template>

            <article class="column is-full message is-primary">
                <div class="message-body">
                    Pour ajouter une nouvelle tâche,
                    <nuxt-link to="/create">cliquez ici</nuxt-link>
                    !
                </div>
            </article>

        </div>

        <div
            class="columns is-mobile"
            v-else>
            <article class="column is-full message is-primary">
                <div class="message-body">
                    Aucune tâche n'est enregistrée. Pour en ajouter une,
                    <nuxt-link to="/create">cliquez ici</nuxt-link>
                    !
                </div>
            </article>
        </div>

    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        components: {
            Task: () => import('~/components/ui/Task')
        },
        fetch( { store } ) {
            store.commit( 'design/SET_BANNER', { title: 'Liste des tâches', transition: true } );
        },
        computed: {
            ...mapGetters( {
                get_sorted_list: `tasks/get_sorted_list`
            } ),
            /**
             * Tasks separation by months
             * It would be better to do this process in a getter: however, I haven't found how to use MomentJS without re-importing it into the VueX module (store/tasks.js).
             * @returns {Array}
             */
            anchored_list() {
                let result = [];
                let buffer = null;

                for ( const task of this.get_sorted_list ) {

                    const anchor = () => {
                        const anchor = this.$moment( task.date ).format( 'MMMM YYYY' );
                        return (!buffer || anchor !== buffer) && !this.isExpired( task.date ) ? (buffer = anchor) : false;
                    };

                    result.push( {
                        anchor: anchor(),
                        task
                    } );
                }
                return result;
            }
        },
        methods: {
            isExpired( date ) {
                return (this.$moment( date ) <= this.$moment().subtract( 1, 'd' ));
            }
        },
        mounted() {
            if ( window.location.hash ) {
                const target = document.getElementById( window.location.hash.split( '#' )[ 1 ] );
                if ( target ) {
                    target.classList.add( 'halo', 'success' );

                    setTimeout( () => { // Possible issue, need to be reviewed
                        target.classList.remove( 'halo', 'success' );
                    }, 4200 );
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

    section {

        div.inline-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            grid-column-gap: 1.25rem;
        }

        article.message {
            margin-top: 0.625rem;

            > .message-body {
                border-radius: 0;
            }
        }
    }

</style>

