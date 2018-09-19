<template>
    <section class="container gap">

        <div
            class="columns is-multiline is-mobile"
            v-if="sorted_list.length">

            <template
                v-for="(item, index) of anchored_list">

                <!-- Divider -->
                <div
                    class="column is-full"
                    :key="index"
                    v-if="item.anchor && !isExpired(item.todo.date)">

                    <div class="inline-grid">
                        <nuxt-link
                            class="button is-primary"
                            :to="{name: 'create', params: { date:item.todo.date } }">Ajouter une tâche
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
                    :key="item.todo.id">
                    <task
                        :title="item.todo.title"
                        :completed="item.todo.completed"
                        :date="item.todo.date"/>
                </div>
                <!-- END Task -->

            </template>

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
        computed: {
            sorted_list() {
                return this.$store.getters[ 'todos/get_sorted_list' ];
            },
            anchored_list() {
                const sorted_list = this.sorted_list;
                let result = [];
                let buffer = null;

                for ( const todo of sorted_list ) {

                    const anchor = () => {
                        const anchor = this.$moment( todo.date ).format( 'MMMM YYYY' );
                        if ( !buffer || anchor !== buffer ) {
                            buffer = anchor;
                            return anchor;
                        }
                        return false;
                    };

                    result.push( {
                        anchor: anchor(),
                        todo
                    } );
                }
                return result;
            }
        },
        methods: {
            isExpired(date) {
                return (this.$moment(date) <= this.$moment());
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

            > .message-body {
                border-radius: 0;
            }
        }
    }

</style>

