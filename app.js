Garuda('angka_satu').focus();

/*
* Fungsi merubah text menjadi audio
* Menggunakan library javascript 'responsivevoice'
*/
function textToAudio($text)
{
	// Jika variabel $text tersedia
	if ($text)
	{
		// Panggil function 
		// responsiveVoice.speack();
		responsiveVoice.speak("Hasilnya adalah "+$text,'Indonesian Male');
	}
}


/*
*  Fungsi menghitung
*/
function calculate(){
	var angka_satu = Garuda('angka_satu').getValue;
	var angka_dua = Garuda('angka_dua').getValue;

	if (angka_satu==='' || angka_satu == null)
	{
		Garuda('angka_satu').focus();
		return;
	}	

	if (angka_dua==='' || angka_dua == null)
	{
		Garuda('angka_dua').focus();
		return;
	}	

	/**
	*  Merubah value dari input text
	*  Menjadi tipe data integer
	*/
	angka_satu = parseInt(angka_satu);
	angka_dua = parseInt(angka_dua);
	
	// membuat variabel operator_used untuk menampung
	// operator (+,-,*,/)
	var operator_used=undefined;

	/*
	* Memeriksa input radio button penjumlahan
	*/
	if (operator_penjumlahan.checked)
	{
		operator_used = 1;
	}
	/*
	* Memeriksa input radio button pengurangan
	*/
	else if (operator_pengurangan.checked)
	{
		operator_used = 2;
	}
	/*
	* Memeriksa input radio button perkalian
	*/
    else if (operator_perkalian.checked)
	{
		operator_used = 3;
	}
	/*
	* Memeriksa input radio button pembagian
	*/
	else if (operator_pembagian.checked)
	{
		operator_used = 4;
	}

	// Membuat variabel baru
	// Untuk menampung hasil
	var result_angka = 0;

	// Check jika variabel operator_used sama dengan undefined
	// maka tampilkan pesan
	if (operator_used===undefined)
	{
		// menampilkan pesan 
		_a("Silahkan Pilih Operator Terlebih Dulu !");
	}else{	
		// Check variabel operator_used
		if (operator_used==1)
		{
			// jika 1, maka operasi perhitungan penjumlahan
			result_angka = angka_satu + angka_dua;	
		}else if (operator_used==2)
		{
			// jika 2, maka operasi perhitungan pengurngan
			result_angka = angka_satu - angka_dua;
		}else if (operator_used==3)
		{
			// jika 3, maka operasi perhitungan perkalian
			result_angka = angka_satu * angka_dua;
		}else if (operator_used==4)
		{
			// jika 4, maka operasi perhitungan pembagian
			result_angka = angka_satu / angka_dua;
		}

		// Menampilkan hasil result_angka ke div 'display_result'
		Garuda('display_result').setHtml(result_angka.toString());

		// Menjalankan fungsi textToAudio()
		// Dengan memasukkan parameter result_angka
		textToAudio(result_angka.toString());
	}
}

function clearAll(){

	// Menggunakan function GarudaInput
	$all_input = new GarudaInput([
		'angka_satu',
		'angka_dua'
	]);	

	$all_input.set('clear');

	// Menghilangkan centang pada semua input radio
	operator_penjumlahan.checked = false;
	operator_pengurangan.checked = false;
	operator_perkalian.checked = false;
	operator_pembagian.checked = false;
}
