<template>
    <div class="card-box">

        <div
            class="card"
            :class="{'alert': isExpired(), 'pending': pending}">
            <nuxt-link
                class="card-content"
                :to="`/${task.id}`">
                <p
                    class="title"
                    :class="{'completed': task.completed}">{{ _title }}</p>
                <p class="subtitle">
                    <time datetime="2016-1-1">{{ _date }}</time>
                </p>
            </nuxt-link>
            <footer class="card-footer">
                <a
                    href="#"
                    class="card-footer-item"
                    @click.prevent="toggle_task">Valider</a>
                <nuxt-link
                    class="card-footer-item"
                    :to="`${task.id}/edit`">Éditer
                </nuxt-link>
                <a
                    href="#"
                    class="card-footer-item"
                    @click.prevent="openModal">Supprimer</a>
            </footer>

            <transition name="fade">
                <div
                    class="modal is-active"
                    v-if="modal">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <article class="message is-danger">
                            <div class="message-header">
                                Attention !
                                <button
                                    class="delete"
                                    @click="closeModal"></button>
                            </div>
                            <div class="message-body">
                                <h3>La suppression d'une tâche est <b>irréversible</b> !</h3>
                                <p>Souhaitez-vous réellement effectuer cette action ?</p>
                                <div class="field is-grouped">
                                    <p class="control">
                                        <a
                                            class="button is-danger"
                                            @click="delete_task">
                                            Absolument
                                        </a>
                                    </p>
                                    <p class="control">
                                        <a
                                            class="button is-success"
                                            @click="closeModal">
                                            Retour
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </transition>

        </div>

    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Task',
        props: {
            task: {
                type: Object,
                required: true
            },
            list: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            pending: true,
            modal: false
        }),
        computed: {
            _date() {
                const date = this.$moment( this.task.date );
                return date.format( 'DD MMMM YYYY' );
            },
            _title() {
                return this.list ? this.$options.filters.max( this.task.title, 50 ) : this.task.title;
            }
        },
        methods: {
            ...mapActions( {
                _update_task: `tasks/update_task`,
                _delete_task: `tasks/delete_task`
            } ),
            isExpired() {
                return (this.$moment( this.task.date ) <= this.$moment().subtract( 1, 'd' ));
            },
            openModal() {
                if ( this.pending ) return;
                this.modal = true;
            },
            closeModal() {
                if ( this.pending ) return;
                this.modal = false;
            },
            async toggle_task() {

                if ( this.pending ) return;
                this.pending = true;

                const editedTask = Object.assign( {}, this.task, { completed: !this.task.completed } );
                const result = await this._update_task( editedTask );
                if ( result ) {
                    this.pending = false;
                    if ( !this.list ) {
                        this.$router.push( `/#${this.task.id}` ); // A retirer pour analyser le bug de mise à jour
                    }
                }
            },
            async delete_task() {

                if ( this.pending ) return;
                this.pending = true;

                const result = await this._delete_task( this.task.id );
                if ( result ) {
                    this.pending = false;
                    if ( !this.list ) {
                        this.$router.push( '/' );
                    }
                    else {
                        this.closeModal();
                    }
                }

            }
        },
        mounted() {
            this.pending = false;
        }
    };
</script>

<style lang="scss" scoped>

    div.card-box {
        height: 100%;
    }

    div.card {
        display: grid;
        grid-template-rows: 1fr auto;
        height: 100%;

        &.alert {
            border: 1px solid get-color('dark', 'radical red');
            background-color: lighten(get-color('dark', 'radical red'), 30%);
            box-shadow: none;
            position: relative;
            @extend .halo;

            *:not([class*='is-']) {
                border-color: get-color('dark', 'radical red');
            }
        }

        > .card-content {
            display: grid;
            grid-template-rows: 1fr auto;
            grid-row-gap: 20px;
            height: 100%;
            overflow: hidden;

            > p {
                margin: 0;

                &.title {

                    &.completed {
                        color: #b0b0b0;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }

    div.modal {

        div.message-body {

            div.field {
                margin-top: 20px;
            }
        }
    }

</style>
