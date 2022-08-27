'use strict';

$(function() {
	$('#add').click(async function() {
		let html;

		const title = $('#new-task').val();
		if (!title) return;

		try {
			const response = await fetch('/tasklist', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({title})
			});
			html = await response.text();
		}
		catch (e) {
			console.error(e);
			return;
		}

		const $div = $(html);
		$('#tasks-panel').removeClass('d-none').prepend($div);
		$('#no-tasks-panel').addClass('d-none');
	});

	$('#tasks-panel').on('click', '.delete', async function() {
		let json;

		const $this = $(this);
		const id = $(this).prev('.id').val();

		try {
			const response = await fetch(`/tasklist/${id}`, {
				method: 'DELETE',
				headers: {'Content-Type': 'application/json'}
			});
			json = await response.json();

			if (!json.success)
				throw new Error('Expected success to be true.');
		}
		catch (e) {
			console.error(e);
			return;
		}
		$this.closest('.row').remove();

		if ($('#tasks-panel .row').length === 0) {
			$('#tasks-panel').addClass('d-none');
			$('#no-tasks-panel').removeClass('d-none');
		}

		$('#new-task').focus();
	});

	$('#new-task').focus();
});
