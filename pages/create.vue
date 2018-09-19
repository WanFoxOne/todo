<template>
    <section class="container gap">
        <form>

            <!-- Content -->
            <div class="field">
                <label class="label">Description de la tâche</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="..."
                        maxlength="150"
                        v-model.trim="form.title"
                        autocomplete="off">
                </div>
                <p class="help">150 caractères maximum</p>
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
                    <button class="button is-link">Valider</button>
                </div>
                <div class="control">
                    <nuxt-link 
                        class="button is-text" 
                        to="/">Retour</nuxt-link>
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
                title: null,
                date: null
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
            const params = this.$route.params;
            if ( params.date ) {
                this.form.date = this.$moment( params.date ).startOf( 'month' ).format( 'YYYY-MM-DD' )
            }
        }
    };
</script>

<style lang="scss" scoped>

    section {
        padding: 20px 0 50px;
    }

</style>

