<template>
    <section class="container gap">

        <div
            class="columns is-multiline is-mobile"
            v-if="sorted_list.length">

            <template v-for="(item, index) of anchored_list">

                <!-- Divider -->
                <div
                    class="column is-full"
                    :key="index"
                    v-if="item.anchor && !isExpired(item.task.date)">

                    <div class="inline-grid">
                        <nuxt-link
                            class="button is-primary"
                            :to="{name: 'create', params: { date:item.task.date } }">Ajouter une tâche
                        </nuxt-link>
                        <div
                            class="is-divider"
                            :data-content="item.anchor | capitalize"></div>
                    </div>


                </div>
                <!-- END Divider -->

                <!-- Task -->
                <div
                    class="column is-full-mobile is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                    :key="item.task.id"
                    :id="item.task.id">
                    <task
                        :title="item.task.title"
                        :completed="item.task.completed"
                        :date="item.task.date"
                        :class="{'pending': is_pending(item.task.id)}"
                        @toggle="toggle_task(item.task)"/>
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
    import Task from '~/components/ui/Task';

    export default {
        components: {
            Task
        },
        fetch( { store, params } ) {

            // Set banner content
            store.commit( 'design/set_banner_content', {
                title: 'Liste des tâches',
                transition: true
            } );
        },
        data: () => ({
            pending: []
        }),
        computed: {
            sorted_list() {
                return this.$store.getters[ 'todos/get_sorted_list' ];
            },
            anchored_list() {
                const sorted_list = this.sorted_list;
                let result = [];
                let buffer = null;

                for ( const task of sorted_list ) {

                    const anchor = () => {
                        const anchor = this.$moment( task.date ).format( 'MMMM YYYY' );
                        if ( !buffer || anchor !== buffer ) {
                            buffer = anchor;
                            return anchor;
                        }
                        return false;
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
            },
            async toggle_task( task ) {
                this.pending.push( task.id );
                const editedTask = Object.assign( {}, task, { completed: !task.completed } );
                const result = await this.$store.dispatch( 'todos/update_task', editedTask );
                if ( result ) {
                    this.pending.splice( this.pending.indexOf( task.id ), 1 );
                }
            },
            is_pending( id ) {
                return (this.pending.indexOf( id ) > -1);
            }
        },
        mounted() {
            if ( window.location.hash ) {
                document.getElementById( window.location.hash.split( '#' )[ 1 ] ).classList.add( 'halo', 'success' );
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
            grid-column-gap: 20px;
        }

        article.message {
            margin-top: 10px;

            > .message-body {
                border-radius: 0;
            }
        }
    }

</style>

