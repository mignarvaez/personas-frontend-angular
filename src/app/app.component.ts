import { Component, OnInit } from '@angular/core';
//Componentes usados para el formular que permite crear una nueva persona
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Se importan los servicios de pais, estado y persona
import { PaisesService } from './services/paises/paises.service';
import { EstadosService } from './services/estados/estados.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//OnInit indica que el componente debe implementarse al iniciar
export class AppComponent implements OnInit {

  //Variables
  personaForm: FormGroup;
  //Los paises de la aplicación
  paises: any;
  //Los estados de la aplicación
  estados: any;
  //Los personas de la aplicación
  personas: any;

  //Constructor de la aplicación
  constructor(
    public fb: FormBuilder,
    public paisesService: PaisesService,
    public estadosService: EstadosService,
    public personaService: PersonaService,
  ) {
    this.personaForm = this.fb.group({});
  }
  ngOnInit(): void {
    //Se ponen todos los elementos que van a ir dentro del formulario con validadores
    //Para cada elemento
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.email],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
    });

    //Se subscribe al servicio de paises, se recibe la respuesta y se gestiona posibles errores
    //mostrandolos en consola
    this.paisesService.getAllPaises().subscribe(resp => {
      //Se asignan los valores de la respuesta a la variable paises
      this.paises = resp;
    },
      error => { console.error(error) }
    );

    //Se subscribe al servicio de personas, se recibe la respuesta y se gestiona posibles errores
    //mostrandolos en consola
    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => { console.error(error) }
    );

    //Se obtiene el elemento pais de personaForm y se subscribe al mismo segun sus cambios
    //para actualizar los estados
    this.personaForm.get('pais')?.valueChanges.subscribe(value => {
      //Gestiona la presentación de los resultados de la busqueda de estados por país.
      //Si el value es diferente de null se ejecuta la actualización
      //Realiza la subscripción y se gestiona posibles errores mostrandolos en consola
      if (value != null) {
        this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
          //Se asignan los valores de la respuesta a la variable estados
          this.estados = resp;
        },
          error => { console.error(error) }
        )
      }

    });
  }
  //Método para guardar una persona, de tipo void
  //Se subscribe al servicio de personas y se gestiona posibles errores
  //mostrandolos en consola. Se le pasa la persona almacenada en personaForm, como un value(los valores ingresados como string).
  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      //Si al agregar no se presentan errores se limpia el formulario
      this.personaForm.reset();

      //Se verifica si lo que se va a guardar es una nueva persona o la edición de una ya registrada
      //Para esto se realiza un filtro en donde se obtiene una nueva lista de personas en el que
      //Se elimina la persona repetida, es decir aquella cuyo id(resp.id) ya se encuentre registrado(persona.id)
      this.personas = this.personas.filter((persona: any) =>resp.id!==persona.id);

      //Se agrega al elemento personas la nueva persona agregada, que corresponde con la respuesta.
      this.personas.push(resp);
    },
      error => { console.error(error) });
  }

  //Método usado para eliminar una persona dada una id.
  eliminar(persona: any) {
    //Se suscribe al metetodo delete del servicio de personas y se muestra en consolas posibles errores
    this.personaService.deletePersona(persona.id).subscribe(resp => {
      //Si se logro eliminar satisfactoriamente se elimina del elemento personas la persona eliminada.
      if (resp === true) {
        this.personas.pop(persona);
      }
    },
      error => { console.error(error) });
  }

  //Método usado para editar una persona
  //Asigna al formulario los valores de la persona sobre la que
  //se ejecuta el método editar.
  editar(persona: any) {
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      correo: persona.correo,
      pais: persona.estado.pais,
      estado: persona.estado
    });
  }
}
