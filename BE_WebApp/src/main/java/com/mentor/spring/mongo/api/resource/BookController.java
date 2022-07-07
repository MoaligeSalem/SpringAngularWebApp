package com.mentor.spring.mongo.api.resource;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.mentor.spring.mongo.api.model.Csv;
import com.mentor.spring.mongo.api.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mentor.spring.mongo.api.model.PowerProFile;

import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class BookController {
	@Autowired
	private BookRepository repository;

	@Autowired
	private SequenceGeneratorService seqGener;

	@PostMapping("addBook")
	public String saveBook(@RequestBody PowerProFile book) {
		repository.save(book);

		return "added book with path:"+ book.getPath() ;
	}




	int n_inp=0;
	int nonMatched=0;
	List<String> headers=new ArrayList<String>();
	String[] row ;
	List<List<String>> body= new ArrayList<List<String>>();
	List<List<String>> comparison=new ArrayList<List<String>>();
	Boolean flag=true,newcomp=true;


	@RequestMapping(value="importCSVLength/length", params= {"n_input"})
	public void importNinput(@RequestParam(value="n_input") int n_input) {
		n_inp=n_input;
		System.out.println("nombre d'input is: "+n_input);
	}
	@RequestMapping(value = "importCSV/path", params = {"pathh", "csvname","numOfCsv"})
	public List<List<String>> save(
			@RequestParam(value = "pathh") String pathh,
			@RequestParam(value = "csvname") String csvname,
			@RequestParam(value = "numOfCsv") int numOfCsv ){

		String p = pathh;
		PowerProFile cs = new PowerProFile();
		cs.setId(seqGener.generateSequence(PowerProFile.SEQUENCE_NAME));

		cs.setPath(p);
		cs.setCsvname(csvname);
		ArrayList<Csv> f = new ArrayList<>();
		try {
			String line="";
			int d=0;
			BufferedReader reader = new BufferedReader(new FileReader(p));
			Boolean header=true;
			if(newcomp==true ) {
				comparison.clear();headers.clear();
				newcomp=false;body.clear();nonMatched=0;
				System.out.println("================== new comparison ==================");
			}
			System.out.println("------------------ new path ------------------");

			while ((line = reader.readLine())  != null && line.split(",").length>0) {
				String[] bk = line.split(",");
				System.out.println("------------------ new row"+d+"  ------------------");
				System.out.println("numOFCsv: "+numOfCsv+" with row value :"+Arrays.toString(bk));
				if(flag==true) {

					System.out.println("flag is true");
					int ni=0;
					while(ni<20*(2*n_inp-1)+1) {
						headers.add("");
						ni++;
					}
					row =new String[20*(2*n_inp-1)+1];
					ni=0;
					while(ni<20*(2*n_inp-1)+1) {
						row[ni]="";
						ni++;

					}
					flag=false;
				}
				//remplissage des titres d'entete
				int j=0;
				if(header==true) {
					System.out.println("on the header true with num of csv is: "+numOfCsv);

					if(numOfCsv==1) {
						headers.set(0, bk[0]);
					}
					while(j<20 ) {
						headers.set(numOfCsv+j*(2*n_inp-1),csvname+"_"+bk[j+1]);//numOfCsv=1 => 0,3,6
						if(numOfCsv!=1) {
							headers.set(n_inp-1+numOfCsv+j*(2*n_inp-1), csvname+"_"+bk[j+1]+"_Diff%");
						}

						j+=1;
					}


					header=false;
					d++;
				}
				else {

					if(numOfCsv==1) {//csv de reference

						row[0]=bk[0];
						j=0;
						while(j<20) {
							row[numOfCsv+j*(2*n_inp-1)]=bk[j+1];
							j+=1;
						}
						j=0;


						body.add(List.of(row));

					}
					else {
						System.out.println("else on the csv to compare with body size= "+body.size());
						d++;
						String matched=bk[0].toLowerCase().replaceAll("[ ./-_,\"]", "");

						int k=0;
						Boolean flag=true;
						while(k<body.size()) {
							String matchedRef=body.get(k).get(0).toLowerCase().replaceAll("[ ./-_,\"]", "");;
							if(matched.equalsIgnoreCase(matchedRef)) {
								flag=false;
								j=0;
								List<String> l=new ArrayList<String>();
								int ni=0;
								while(ni<20*(2*n_inp-1)+1) {
									l.add(body.get(k).get(ni));
									ni++;
								}
								while(j<20) {
									int jj=numOfCsv+j*(2*n_inp-1);
									l.set(jj,bk[j+1]);
									System.out.println(l.get(jj-(numOfCsv-1)));
									Double refValue=Double.parseDouble(l.get(jj-(numOfCsv-1)));
									Double cmpValue=Double.parseDouble(l.get(jj));
									Double diff=(100*(refValue-cmpValue)/refValue);
									String s=Double.toString(diff);
									l.set(n_inp-1+jj,s);

									j+=1;
								}
								body.set(k, l);

								break;
							}
							k++;

						}
						if(flag==true) {
							nonMatched+=1;
							System.out.println("non matched");
						}

					}
				}

				//Enregistrement des CSVs
				Csv csv = new Csv();
				csv.setName(bk[0]);
				csv.setDesign_Leakage_Power(bk[1]);csv.setDesign_Internal_Power(bk[2]);csv.setDesign_Switching_Power(bk[3]);
				csv.setDesign_Total_Power(bk[4]);csv.setCombinational_Leakage_Power(bk[5]);csv.setCombinational_Internal_Power(bk[6]);
				csv.setCombinational_Switching_Power(bk[7]);csv.setCombinational_Total_Power(bk[8]);csv.setRegister_Leakage_Power(bk[9]);
				csv.setRegister_Internal_Power(bk[10]);csv.setRegister_Switching_Power(bk[11]);csv.setRegister_Total_Power(bk[12]);
				csv.setMemory_Leakage_Power(bk[13]);csv.setMemory_Internal_Power(bk[14]);csv.setMemory_Switching_Power(bk[15]);
				csv.setMemory_Total_Power(bk[16]);csv.setClock_Network_Leakage_Power(bk[17]);csv.setClock_Network_Internal_Power(bk[18]);
				csv.setClock_Network_Switching_Power(bk[19]);csv.setClock_Network_Total_Power(bk[20]);

				System.out.println("avant l'enregistrment de la ligne courante du csv");
				f.add(csv);

			}

			System.out.println("---------Import csv path it's okey---------");

			cs.setFields(f);
		} catch (Exception e) {
			// TODO: handle exception
			//throw new RuntimeException("fail to import the CSV file");
			System.out.println("we have an Exception! : "+e);
		}
		System.out.println("before saving csv, n_input is "+n_inp+" and numOfCsv is "+numOfCsv);
		repository.save(cs);

		if(numOfCsv==n_inp) {
			newcomp=true;
			flag=true;
			System.out.println("numOfCsv equal to n_input");

			//send data to comparison table
			comparison.add(headers);
			Boolean rowToadd;
			for (List<String> list : body) {
				rowToadd=true;
				for (String s : list) {
					if(s=="") {
						rowToadd=false;break;
					}
				}
				if(rowToadd==true) {
					comparison.add(list);
				}


			}



			System.out.println("comparison table  is:");
			for (List<String> list : comparison) {
				System.out.println(list);
			}
			System.out.println("we are on the last path wich number is "+numOfCsv);
			System.out.println("the non matched number is: "+nonMatched);

			return comparison;
		}

		System.out.println("return is null ");
		return null;
	}



	@CrossOrigin(origins = "http://localhost:4200/comparaison")
	@GetMapping("findAllBooks")
	public List<PowerProFile> getBooks(){
		return repository.findAll();
	}



	@GetMapping("findAllBooks/{id}")
	public Optional<PowerProFile> getBook(@PathVariable int id){
		return repository.findById(id);}
	@DeleteMapping("delete/{id}")
	public String deleteBook(@PathVariable int id) {
		repository.deleteById(id);
		return "deleted book id: "+ id;
	}

	@PostMapping("importCSV")
	public String saveCus(@RequestParam("file") MultipartFile file) {
		String csvFile = "src/main/resources/book.csv";

		if (CSVHelper.hasCSVFormat(file)) {
			try {
				BufferedReader reader = new BufferedReader(new FileReader(csvFile));

				String line = "";
				while ((line = reader.readLine()) != null) {
					String[] book = line.split(";");
					PowerProFile cs = new PowerProFile();

					cs.setPath(book[1]);


					repository.save(cs);
				}
				return "file uploaded successfully";


			} catch (Exception e) {
				// TODO: handle exception


				return "Exception";

			}
		}

		return "Please upload a csv file!";
	}

}
