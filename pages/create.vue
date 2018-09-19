<template>
    <section class="container gap">
        <form @submit="submit">

            <!-- Content -->
            <div class="field">
                <label class="label">Description de la tâche</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="..."
                        maxlength="50"
                        v-model.trim="form.title"
                        autocomplete="off">
                </div>
                <p class="help">{{ length_available(50,form.title) }}</p>
            </div>
            <!-- END Content -->

            <!-- Expiration date -->
            <div class="field">
                <label class="label">Date d'expiration</label>
                <div class="control">
                    <input
                        class="input"
                        type="date"
                        v-model="form.date"
                        :min="now"
                        autocomplete="off">
                </div>
            </div>
            <!-- END Expiration date -->

            <hr>

            <div class="field is-grouped">
                <div class="control">
                    <button
                        class="button is-link"
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

        </form>

    </section>
</template>

<script>
    export default {
        fetch( { store, params } ) {

            // Set banner content
            store.commit( 'design/set_banner_content', {
                title: 'Création d\'une tâche',
                transition: true
            } );
        },
        data: () => ({
            form: {
                id: null,
                title: null,
                date: null,
                completed: false
            }
        }),
        computed: {
            now() {
                return new Date().toISOString().substring( 0, 10 );
            },
            title_short() {
                if ( this.form.title.length >= 50 ) {
                    return `${this.form.title.substring( 0, 46 )} ...`;
                }
                return this.form.title;
            }
        },
        methods: {
            length_available(max, target) {
                if(!target) return `${max} caractère${max - 1 ? 's' : ''} maximum`;
                const result = max - target.length;
                return (result) ? `${result} caractère${result - 1 ? 's' : ''} restant${result - 1 ? 's' : ''}` : 'Limite du nombre de caractères atteinte';
            },
            async submit( event ) {
                event.preventDefault();
                const result = await this.$store.dispatch( 'todos/create_task', this.form );
                if ( result ) {
                    this.$router.push( `/#${this.form.id}` );
                }
            }
        },
        watch: {
            form: {
                handler( val ) { // Set banner content dynamically
                    this.$store.commit( 'design/set_banner_content', {
                        title: (this.form.title) ? `Création de la tâche "<i>${this.title_short}</i>"` : 'Création d\'une tâche',
                        transition: false
                    } );
                },
                deep: true
            }
        },
        created() {

            this.form.id = this.$uniqid();

            const params = this.$route.params;
            if ( params.date ) {
                const now = this.$moment();
                const pre_date = this.$moment( params.date ).startOf( 'month' );
                this.form.date = now < pre_date ? pre_date.format( 'YYYY-MM-DD' ) : now.format( 'YYYY-MM-DD' );
            }
        }
    };
</script>

<style lang="scss" scoped>

    section {
        padding: 20px 0 50px;
    }

</style>

