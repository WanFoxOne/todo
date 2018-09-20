<template>
    <section class="container gap">

        <!-- Form -->
        <form @submit.prevent="submit">

            <!-- Title -->
            <div class="field">
                <label
                    class="label"
                    for="form_title">Description de la tâche <sup>*</sup></label>
                <div class="control">
                    <textarea
                        id="form_title"
                        class="textarea"
                        v-model.trim="form.inputs.title"
                        @blur="displayErrors"
                        maxlength="500"
                        placeholder="..."
                        autocomplete="off"
                        data-vv-name="Description de la tâche"
                        v-validate="'required'"></textarea>
                </div>
                <p class="help">{{ length_available(500, form.inputs.title) }}</p>
            </div>
            <!-- END Title -->

            <!-- Expiration date -->
            <div class="field">
                <label
                    class="label"
                    for="form_date">Date d'expiration <sup>*</sup></label>
                <div class="control">
                    <input
                        id="form_date"
                        class="input"
                        type="date"
                        v-model="form.inputs.date"
                        @blur="displayErrors"
                        :min="_now"
                        autocomplete="off"
                        data-vv-name="Date d'expiration"
                        v-validate="'required'">
                </div>
            </div>
            <!-- END Expiration date -->

            <hr>

            <!-- Actions -->
            <div class="field is-grouped">
                <div class="control">
                    <button
                        class="button is-link"
                        :class="{'is-loading': pending}"
                        :disabled="!form.isValid"
                        type="submit">Valider
                    </button>
                </div>
                <div class="control">
                    <nuxt-link
                        class="button is-text"
                        to="/">Retour
                    </nuxt-link>
                </div>
            </div>
            <!-- END Actions -->

            <!-- Errors display -->
            <transition name="fade">
                <div v-if="_displayErrors">
                    <hr>
                    <transition-group
                        name="list"
                        tag="div"
                        class="tile is-ancestor">
                        <div
                            class="tile is-parent is-4"
                            v-for="error of errors.items"
                            :key="error.id">
                            <article class="tile is-child notification is-warning">
                                <p class="title">{{ error.field }}</p>
                                <p class="subtitle">{{ error.msg }}</p>
                            </article>
                        </div>
                    </transition-group>
                </div>
            </transition>
            <!-- END Errors display -->

        </form>
        <!-- END Form -->

    </section>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';

    export default {
        name: 'TaskForm',
        props: {
            mode: { // create_task|update_task
                type: String,
                required: true
            },
            task: {
                type: Object,
                default: null
            }
        },
        data: () => ({
            form: {
                inputs: {
                    id: null,
                    title: null,
                    date: null,
                    completed: false
                },
                isValid: false,
                displayErrors: false
            },
            pending: true
        }),
        computed: {
            _now() {
                return new Date().toISOString().substring( 0, 10 );
            },
            _title_short() {
                return this.$options.filters.max( this.form.inputs.title, 50 );
            },
            _displayErrors() {
                return (!this.form.isValid && this.form.displayErrors);
            }
        },
        methods: {
            ...mapActions( {
                create_task: `tasks/create_task`,
                update_task: `tasks/update_task`
            } ),
            ...mapMutations( {
                SET_BANNER: `design/SET_BANNER`
            } ),
            length_available( max, target ) {
                if ( !target ) return `${max} caractère${max - 1 ? 's' : ''} maximum`;
                const result = max - target.length;
                return (result) ? `${result} caractère${result - 1 ? 's' : ''} restant${result - 1 ? 's' : ''}` : 'Limite du nombre de caractères atteinte';
            },
            displayErrors() {
                this.form.displayErrors = true;
            },
            async submit( event ) {
                if ( this.pending ) return;
                this.pending = true;

                const result = await this[ this.mode ]( this.form.inputs );
                if ( result ) {
                    this.pending = false;
                    this.$router.push( `/#${this.form.inputs.id}` );
                }
            }
        },
        watch: {
            form: {
                handler( val ) {

                    // Set banner content dynamically
                    const type = (this.mode === 'update_task') ? 'Édition' : 'Création';
                    this.SET_BANNER( {
                        title: (this.form.inputs.title) ? `${type} de la tâche "<i>${this._title_short}</i>"` : `${type} d'une tâche`,
                        transition: false
                    } );

                    // Validate form
                    this.$validator.validateAll().then( result => this.form.isValid = result );
                },
                deep: true
            }
        },
        created() {
            if ( this.mode === 'update_task' ) {
                this.form.inputs = this.task;
            }
            else {
                this.form.inputs.id = this.$uniqid();

                const params = this.$route.params;
                if ( params.date ) {
                    const _now = this.$moment();
                    const pre_date = this.$moment( params.date ).startOf( 'month' );
                    this.form.inputs.date = _now < pre_date ? pre_date.format( 'YYYY-MM-DD' ) : _now.format( 'YYYY-MM-DD' );
                }
            }
        },
        mounted() {
            this.pending = false;
        }
    };
</script>

<style lang="scss" scoped>

    section {

        div.tile {

            article.notification {
                padding: 0.5rem 1rem 0.5rem 1rem;

                > p.title {
                    font-size: 1.2rem;
                }

                > p.subtitle {
                    font-size: 1rem;
                }
            }
        }
    }

</style>
