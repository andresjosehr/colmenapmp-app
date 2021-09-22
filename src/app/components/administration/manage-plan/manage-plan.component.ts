import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { Provider } from 'src/app/interfaces/provider/provider';

@Component({
  selector: 'app-manage-plan',
  templateUrl: './manage-plan.component.html',
  styleUrls: ['./manage-plan.component.scss']
})
export class ManagePlanComponent implements OnInit {

  planProviders = [
      {
        "id": 1,
        "plan_id": 9,
        "provider_id": 89,
        "percentage_ambulatory": 8.00,
        "percentage_hospitable": 9.54,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 2,
        "plan_id": 9,
        "provider_id": 7,
        "percentage_ambulatory": 8.00,
        "percentage_hospitable": 9.54,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 3,
        "plan_id": 9,
        "provider_id": 6,
        "percentage_ambulatory": 8.00,
        "percentage_hospitable": 9.54,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 4,
        "plan_id": 9,
        "provider_id": 4,
        "percentage_ambulatory": 8.00,
        "percentage_hospitable": 9.54,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 5,
        "plan_id": 12,
        "provider_id": 89,
        "percentage_ambulatory": 7.85,
        "percentage_hospitable": 9.54,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 6,
        "plan_id": 12,
        "provider_id": 7,
        "percentage_ambulatory": 7.85,
        "percentage_hospitable": 9.54,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 7,
        "plan_id": 12,
        "provider_id": 6,
        "percentage_ambulatory": 7.85,
        "percentage_hospitable": 9.54,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 8,
        "plan_id": 12,
        "provider_id": 4,
        "percentage_ambulatory": 7.85,
        "percentage_hospitable": 9.54,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 9,
        "plan_id": 13,
        "provider_id": 50,
        "percentage_ambulatory": 8.26,
        "percentage_hospitable": 8.91,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 10,
        "plan_id": 13,
        "provider_id": 1,
        "percentage_ambulatory": 8.27,
        "percentage_hospitable": 9.47,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 11,
        "plan_id": 13,
        "provider_id": 3,
        "percentage_ambulatory": 8.27,
        "percentage_hospitable": 9.47,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 12,
        "plan_id": 13,
        "provider_id": 15,
        "percentage_ambulatory": 8.27,
        "percentage_hospitable": 9.47,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 13,
        "plan_id": 13,
        "provider_id": 69,
        "percentage_ambulatory": 8.27,
        "percentage_hospitable": 0.00,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 14,
        "plan_id": 13,
        "provider_id": 53,
        "percentage_ambulatory": 8.26,
        "percentage_hospitable": 8.91,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 15,
        "plan_id": 13,
        "provider_id": 27,
        "percentage_ambulatory": 8.26,
        "percentage_hospitable": 8.91,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 16,
        "plan_id": 13,
        "provider_id": 87,
        "percentage_ambulatory": 8.26,
        "percentage_hospitable": 8.91,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 17,
        "plan_id": 13,
        "provider_id": 52,
        "percentage_ambulatory": 8.26,
        "percentage_hospitable": 8.91,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 18,
        "plan_id": 13,
        "provider_id": 51,
        "percentage_ambulatory": 8.26,
        "percentage_hospitable": 8.91,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 19,
        "plan_id": 13,
        "provider_id": 26,
        "percentage_ambulatory": 8.26,
        "percentage_hospitable": 8.91,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      },
      {
        "id": 20,
        "plan_id": 13,
        "provider_id": 49,
        "percentage_ambulatory": 8.26,
        "percentage_hospitable": 8.91,
        "urgency_amount": null,
        "urgency_unit": null,
        "created_at": null,
        "updated_at": null
      }
    ]

  displayedColumns = ['id', 'provider', '% ambulatory', '% hospitable'];
  providers!: Array<Provider>
  providersFiltered!: Array<Provider>
  providerFormControl: FormControl = new FormControl('');
  planFormGroup!: FormGroup;
  planProviderFormGroup!: FormGroup;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {providers: Array<Provider>},
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.providers=this.data.providers
    this.providersFiltered=this.data.providers

    this.planFormGroup = this.formBuilder.group({
      name: [],
      code: [],
      isapre_id: [],
      plan_type_id: [],
      annual_limit: [],
      regional: [],
      national: [],
      pdf: [],
      source: ['Interno']
    })

    this.planProviderFormGroup = this.formBuilder.group({
      plan_id: [],
      provider_id: [],
      percentage_ambulatory: [],
      percentage_hospitable: []
    })
    
   this.providerFormControl.valueChanges.subscribe(value =>{
      this.providersFiltered = this._filter(value)
    }

    );

  }

  private _filter(value: string): Provider[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.providers.filter(provider => provider.name.toLowerCase().includes(filterValue));
  }

  displayFn(value?: number): string {
    return value ? this.providersFiltered.find(provider => provider.id === value)?.name as string : '';
  }
  

}
