import { BaseGenerator } from './base';
import { join } from 'path';

export class CryptoConfigOptions {
    orgs: string[];
    users: number;
}
export class CryptoConfigYamlGenerator extends BaseGenerator {
    contents =
        `
  # ---------------------------------------------------------------------------
  # "OrdererOrgs" - Definition of organizations managing orderer nodes
  # ---------------------------------------------------------------------------
  OrdererOrgs:
    # ---------------------------------------------------------------------------
    # Orderer
    # ---------------------------------------------------------------------------
    - Name: Orderer
      Domain: insitor.demo
      # ---------------------------------------------------------------------------
      # "Specs" - See PeerOrgs below for complete description
      # ---------------------------------------------------------------------------
      Specs:
        - Hostname: orderer
  # ---------------------------------------------------------------------------
  # "PeerOrgs" - Definition of organizations managing peer nodes
  # ---------------------------------------------------------------------------
  PeerOrgs:
    # ---------------------------------------------------------------------------
    # Org1
    # ---------------------------------------------------------------------------
    ${this.options.orgs.map(x=>`- Name: ${x}
      Domain: ${x}.insitor.demo
      # ---------------------------------------------------------------------------
      # "Specs"
      # ---------------------------------------------------------------------------
      # Uncomment this section to enable the explicit definition of hosts in your
      # configuration.  Most users will want to use Template, below
      #
      # Specs is an array of Spec entries.  Each Spec entry consists of two fields:
      #   - Hostname:   (Required) The desired hostname, sans the domain.
      #   - CommonName: (Optional) Specifies the template or explicit override for
      #                 the CN.  By default, this is the template:
      #
      #                              "{{.Hostname}}.{{.Domain}}"
      #
      #                 which obtains its values from the Spec.Hostname and
      #                 Org.Domain, respectively.
      # ---------------------------------------------------------------------------
      # Specs:
      #   - Hostname: foo # implicitly "foo.org1.insitor.demo"
      #     CommonName: foo27.org5.insitor.demo # overrides Hostname-based FQDN set above
      #   - Hostname: bar
      #   - Hostname: baz
      # ---------------------------------------------------------------------------
      # "Template"
      # ---------------------------------------------------------------------------
      # Allows for the definition of 1 or more hosts that are created sequentially
      # from a template. By default, this looks like "peer%d" from 0 to Count-1.
      # You may override the number of nodes (Count), the starting index (Start)
      # or the template used to construct the name (Hostname).
      #
      # Note: Template and Specs are not mutually exclusive.  You may define both
      # sections and the aggregate nodes will be created for you.  Take care with
      # name collisions
      # ---------------------------------------------------------------------------
      Template:
        Count: 1
        # Start: 5
        # Hostname: {{.Prefix}}{{.Index}} # default
      # ---------------------------------------------------------------------------
      # "Users"
      # ---------------------------------------------------------------------------
      # Count: The number of user accounts _in addition_ to Admin
      # ---------------------------------------------------------------------------
      Users:
        Count: ${this.options.users}
    `).join('')}
  `;

  constructor(filename: string, path: string, private options: CryptoConfigOptions) {
    super(filename, path);
    console.log(options);
    this.success = join(path, 'cryptoconfig.yaml.successful');
  }
}