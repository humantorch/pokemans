import Vue from 'vue';
import store from '../store.js';
import axios from 'axios';

export default {
	data() {
		return {
			typeselected: '',
			typesList: [],
			pk: [],
			newpks: [],
			emptySet: false,
			faves: store.state.faves,
			favesObj: store.state.favesObj,
			filterbox: '',
			loading: true,
			errored: false,
			visible: false,
			dialogFormVisible: false,
			addToFaveName: '',
			addToFaveMemo: '',
			form: {
				type: [],
			},
			formLabelWidth: '100',
		};
	},
	mounted() {
		axios.get('https://pokeapi.co/api/v2/type').then((response) => {
			//populate comlumn 1 - types
			this.typesList = response.data.results;

			// check localStorage for 'favesObj' and populate column 3 with existing favorite names & memo
			if (localStorage.getItem('favesObj') !== null) {
				this.favesObj = JSON.parse(localStorage.getItem('favesObj'));
			}
		});
	},
	methods: {
		getListOfType(e) {
			axios
				.get('https://pokeapi.co/api/v2/type/' + e)
				.then((response) => {
					this.newpks = response.data.pokemon;
					this.newpks.length === 0
						? (this.emptySet = true)
						: (this.emptySet = false);

					this.newpks.forEach((entry) => {
						entry['details'] = {};
						entry['details']['sprite'] = null;
					});
					this.loadDetails();
				})
				.catch((error) => {
					console.log(error);
					this.errored = true;
				})
				.finally(() => (this.loading = false));
		},
		loadDetails() {
			this.newpks.forEach((entry) => {
				const pokemonName = entry.pokemon.name;
				const secondApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
				this.getDetailDataByPokemon(secondApiUrl, pokemonName);
			});
		},
		getDetailDataByPokemon(secondApiUrl, pokemonName) {
			axios.get(secondApiUrl).then((response) => {
				this.mapDetailsToInfo(response, pokemonName);
			});
		},
		mapDetailsToInfo(response, pokemonName) {
			const spriteurl = response.data.sprites.front_default;

			this.newpks = this.newpks.map((entry) => {
				const mappedEntry = entry;
				if (entry.pokemon.name === pokemonName) {
					var urlarr = entry.pokemon.url.split('/');
					var pid = urlarr[urlarr.length - 2];

					mappedEntry.id = pid;
					mappedEntry.details =
						spriteurl !== null
							? { sprite: spriteurl }
							: { sprite: '/images/img_not_found.png' };
				}
				return mappedEntry;
			});
		},
		setFavorites(name, memo) {
			if (this.favesObj[name] === undefined) {
				this.favesObj[name] = memo;
			}
			localStorage.setItem('favesObj', JSON.stringify(this.favesObj));

			this.addToFaveMemo = '';
		},
		submitModalEnterKey() {
			document.querySelector('#faveSubmit').click();
		},
		deleteModal(e) {
			this.$confirm(
				'Are you sure you want to delete ' + e + ' from your Favourites?',
				'Warning',
				{
					confirmButtonText: 'OK',
					cancelButtonText: 'Cancel',
					type: 'warning',
				}
			)
				.then(() => {
					this.deleteFavorite(e);
					this.$message({
						type: 'success',
						message: e + ' has been removed from your favorites',
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: 'Operation canceled',
					});
				});
		},
		deleteFavorite(e) {
			if (this.favesObj[e] !== undefined) {
				Vue.delete(this.favesObj, e);

				localStorage.setItem('favesObj', JSON.stringify(this.favesObj));

				if (localStorage.getItem('favesObj') === '{}') {
					localStorage.removeItem('favesObj');
				}
			}
		},
	},
	computed: {
		filteredTypes: function() {
			var self = this;
			return this.typesList.filter(function(type) {
				return (
					type.name.toLowerCase().indexOf(self.filterbox.toLowerCase()) >= 0
				);
			});
		},
	},
};
