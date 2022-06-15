package com.javatechie.spring.mongo.api.resource;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.annotation.Target;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import com.javatechie.spring.mongo.api.model.Compar;
import com.javatechie.spring.mongo.api.model.Csv;
import com.javatechie.spring.mongo.api.repository.ComparRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.javatechie.spring.mongo.api.model.Book;
import com.javatechie.spring.mongo.api.model.Compar;

import com.javatechie.spring.mongo.api.repository.BookRepository;

import org.springframework.web.multipart.MultipartFile;
import com.javatechie.spring.mongo.api.repository.CsvRepository;


import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class BookController {
	@Autowired
	private BookRepository repository;
	@Autowired
	private ComparRepository repo;
	@Autowired
	private SequenceGeneratorService seqGener;

	@PostMapping("addBook")
	public String saveBook(@RequestBody Book book) {
		repository.save(book);

		return "added book with path:"+ book.getPath() ;
	}

	@PostMapping("addBookk")
	public String saveeBook(@RequestBody Compar compar) {
		repo.save(compar);

		return "Comparaison file added" ;
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
		Book cs = new Book();
		cs.setId(seqGener.generateSequence(Book.SEQUENCE_NAME));

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
							//row[n_inp-1+numOfCsv+j*(2*n_inp-1)]=bk[j+1]+" diff";
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
//	            System.out.println("body's on footer:");
//	            for(int jj=0;jj<body.size();jj++) {
//            		System.out.println(body.get(jj));
//            	}
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
		//return "book saved with path : " + pathh + " and name :" + csvname;
//	      List<List<String>> myComp1 = new ArrayList<List<String>>();
//	      List<List<String>> myComp2 = new ArrayList<List<String>>();
//	      myComp1.add(Arrays.asList("Instances","DesignTotalRef1","DesignTotalPath1","DesignLeakageRef1","DesignLeakagePath1"));
//
//	      switch (numOfCsv) {
//				case 1:
//			  myComp1.add(Arrays.asList("cpu",""+numOfCsv,"4.5","3.2","1.3"));
//			  break;
//			  case 3: myComp1.add(Arrays.asList("mem",""+numOfCsv,"2.5","3.2","2.3"));
//			  break;
//			  case 4: myComp1.add(Arrays.asList("gofast",""+numOfCsv,"2.5","5.2","5.3"));
//			  break;
//
//			  default: break;
//	      }
//



	      /*myComp2.add(Arrays.asList("Instances","DesignTotalRef1","DesignTotalPath1","DesignTotalPath2","DesignLeakageRef1","DesignLeakagePath1","DesignLeakagePath2"));
	      myComp2.add(Arrays.asList("cpu","4.3","3.4","6.5","5.3","7.5","5.3"));
	      myComp2.add(Arrays.asList("mem","3.1","4.4","4.3","5.7","4.5","5.7"));
    	  System.out.println("numOfcsv= "+numOfcsv+" et n_input ="+n_input+" ok-----------ok");*/
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
	public List<Book> getBooks(){
		return repository.findAll();
	}

	@GetMapping("findAllBookss")
	public List<Compar> getBookss(){
		return repo.findAll();
	}

	@GetMapping("findAllBooks/{id}")
	public Optional<Book> getBook(@PathVariable int id){
		return repository.findById(id);}
	@DeleteMapping("delete/{id}")
	public String deleteBook(@PathVariable int id) {
		repository.deleteById(id);
		return "deleted book id: "+ id;
	}
	/*@PutMapping("findAllBooks/{id}")
	public String updateBook(@PathVariable int id, @RequestBody Book book) {
		Book b=new Book();
		b=repository.findById(id).orElseThrow(RuntimeException::new);
		b.setPath(book.getPath());
		repository.save(b);
		return "book id "+b.getId()+" updated successfully";
	}*/
	@PostMapping("importCSV")
	public String saveCus(@RequestParam("file") MultipartFile file) {
		//String message = "";
		String csvFile = "src/main/resources/book.csv";
		//Path p = Paths.get("C:/Users/HP PROBOOK/Desktop/bk.csv");
		//String csvFile = p.getFileName().toString();
		if (CSVHelper.hasCSVFormat(file)) {
			try {
				BufferedReader reader = new BufferedReader(new FileReader(csvFile));
				//message = "File uploaded successfully: " + file.getOriginalFilename() + "!";

				String line = "";
				while ((line = reader.readLine()) != null) {
					String[] book = line.split(";");
					Book cs = new Book();
					//Csv csv = new Csv();

					//int id = Integer.parseInt(book[0]);
					//cs.setId(id);
					cs.setPath(book[1]);
					/*csv.setName(book[0]);

					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Switching_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Switching_Power);
					Double Design_Total_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Total_Power);
					Double Combinational_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Combinational_Leakage_Power);
					Double Combinational_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Combinational_Internal_Power);
					/*Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);
					Double Design_Leakage_Power = Double.parseDouble(book[1]);
					csv.setDesign_Leakage_Power(Design_Leakage_Power);
					Double Design_Internal_Power = Double.parseDouble(book[2]);
					csv.setDesign_Internal_Power(Design_Internal_Power);*/

					repository.save(cs);
				}
				return "file uploaded successfully";


			} catch (Exception e) {
				// TODO: handle exception
				//throw new RuntimeException("fail to import the CSV file");

				//message = "Could not upload the file: " + csvFile;

				return "Exception";

			}
		}

		return "Please upload a csv file!";
	}

}
